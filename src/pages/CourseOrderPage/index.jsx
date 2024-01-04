import React, { useEffect, useRef, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { useNavigate, useParams } from "react-router-dom";
import { ROLES } from "../../constant/roles";
import { formatCurrency } from "../../utils/format";
import { useAuthContext } from "../../context/AuthContext";
import useForm from "../../hooks/useForm";
import { regexRule, requiredRule } from "../../utils/validate";
import Button from "../../components/Button";
import { message } from "antd";
import { orderService } from "../../services/orderService";
import { PATHS } from "../../constant/path";

const CourseOrderPage = () => {
  const navigate = useNavigate();
  // Get slug from url
  const { courseSlug } = useParams();

  // Get profile
  const {
    profile,
    courseInfo,
    handleGetProfileCourse,
    handleGetProfilePayment,
  } = useAuthContext();

  const isAlreadyOrder = courseInfo?.some(
    (item) => item?.course?.slug === courseSlug
  );

  const formRef = useRef();

  // Call API get course by slug
  const {
    execute: executeCourseDetail,
    loading: courseDetailLoading,
    data: courseDetailData,
  } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (!!courseSlug) {
      executeCourseDetail(courseSlug || "", {});
    }
  }, [courseSlug]);

  // Modify render data
  const { teams, price, tags } = courseDetailData || {};
  const InfoOrderProps = {
    ...courseDetailData,
    teacherInfo:
      teams?.find((item) => item?.tags.includes(ROLES.teacher)) || {},
    price: formatCurrency(price),
  };

  // Handle Payment method change
  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethodChange = (payment) => {
    setPaymentMethod(payment);
  };

  // orderCourse Service
  const {
    data: orderCourseData,
    loading: orderCourseLoading,
    execute: orderCourse,
  } = useMutation(orderService.orderCourse);

  // Handle when user click order this course
  const _onOrder = () => {
    // Handle validate
    // const profileError = validate();
    const profileError = formRef.current.validate();

    if (Object.keys(profileError).length > 0) {
      console.log("profileError", profileError);
    } else {
      if (paymentMethod) {
        // Payload
        const payload = {
          name: formRef.current.form?.name,
          phone: formRef.current.form?.phone,
          course: courseDetailData?.id,
          type: formRef.current.form?.type,
          paymentMethod,
        };

        // Call API
        orderCourse(payload, {
          // Success order
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.MY_COURSE);
          },
          // Fail order
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn phương thức thanh toán");
      }
    }
  };

  return (
    <main className="mainwrapper --ptop">
      <section className="sccourseorder">
        <div className="container small">
          <InfoOrder {...InfoOrderProps} />
          <FormOrder
            isAlreadyOrder={isAlreadyOrder}
            profile={profile}
            ref={formRef}
            types={tags}
            disabled={isAlreadyOrder}
            courseSlug={courseSlug}
            courseInfo={courseInfo}
            setPaymentMethod={setPaymentMethod}
          />
          <PaymentOrder
            handleChange={handlePaymentMethodChange}
            selectedPayment={paymentMethod}
            disabled={isAlreadyOrder}
          />

          {/* addclass --processing khi bấm đăng ký */}
          <Button
            onClick={_onOrder}
            disabled={isAlreadyOrder}
            loading={orderCourseLoading}
            style={{
              width: "100%",
              cursor: `${isAlreadyOrder ? "not-allowed" : "pointer"}`,
              opacity: `${isAlreadyOrder ? "1" : "0.7"}`,
            }}
          >
            <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default CourseOrderPage;
