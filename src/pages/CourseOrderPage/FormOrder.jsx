import useForm from "@/hooks/useForm";
import { regexRule, requiredRule } from "@/utils/validate";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";

const FormOrder = forwardRef(
  (
    {
      types,
      disabled,
      profile,
      isAlreadyOrder,
      courseSlug,
      courseInfo,
      setPaymentMethod,
    },
    ref
  ) => {
    const {
      firstName: profileName,
      email: profileEmail,
      phone: profilePhone,
    } = profile || {};

    const rules = {
      name: [requiredRule("Vui lòng nhập họ và tên")],
      email: [
        requiredRule("Vui lòng nhập email"),
        regexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requiredRule("Vui lòng nhập phone"),
        regexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requiredRule("Vui lòng chọn hình thức học")],
    };

    const { form, register, validate, setForm } = useForm(
      {
        name: "",
        email: "",
        phone: "",
        type: "",
      },
      rules
    );

    useEffect(() => {
      if (isAlreadyOrder) {
        const info = courseInfo?.find(
          (item) => item?.course?.slug === courseSlug
        );
        setForm({
          name: info?.name || "",
          email: profileEmail || "",
          phone: info?.phone || "",
          type: info?.type || "",
        });
        setPaymentMethod(info.paymentMethod);
      } else {
        setForm({
          name: profileName,
          email: profileEmail,
          phone: profilePhone,
          type: "",
        });
      }
    }, [profileName, profileEmail, profilePhone, isAlreadyOrder, courseInfo]);

    useImperativeHandle(
      ref,
      () => ({
        form,
        validate,
      }),
      [form]
    );

    const typeOptions =
      types?.length > 0
        ? [
            { value: "", label: "--" },
            ...types.map((type) => ({ value: type, label: type })),
          ]
        : [{ value: "", label: "--" }];
    return (
      <div className="itemorder formorder">
        <h3 className="title --t3">Thông tin cá nhân</h3>
        <div className="boxorder">
          <div className="form">
            <div className="form-container">
              <Input
                label="Họ và tên"
                required
                placeholder="Họ và tên"
                {...register("name")}
                disabled={disabled}
              />
              <Input
                label="Email"
                required
                placeholder="Email"
                disabled
                {...register("email")}
              />
            </div>
            <div className="form-container">
              <Input
                label="Số điện thoại"
                required
                placeholder="Số điện thoại"
                disabled={disabled}
                {...register("phone")}
              />
              <Input
                label="Hình thức học"
                required
                renderInput={(inputProps) => {
                  return <Select options={typeOptions} {...inputProps} />;
                }}
                disabled={disabled}
                {...register("type")}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default FormOrder;
