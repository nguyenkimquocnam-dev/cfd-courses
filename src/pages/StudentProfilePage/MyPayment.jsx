import { useAuthContext } from "@/context/AuthContext";
import { Empty } from "antd";
import CoursePaymentItem from "./CoursePaymentItem";

const MyPayment = () => {
  const { paymentInfo } = useAuthContext();

  return (
    <div className="tab__content-item" style={{ display: "block" }}>
      {/* Case: Has data */}
      {!!paymentInfo.length &&
        paymentInfo.map((item, index) => {
          return (
            <CoursePaymentItem
              key={item?.id || new Date().getTime() + index}
              {...item}
            />
          );
        })}

      {/* Case: No data */}
      {!!!paymentInfo.length && (
        <Empty
          description="Không tìm thấy dữ liệu nào"
          style={{ margin: "0 auto" }}
        />
      )}
    </div>
  );
};

export default MyPayment;
