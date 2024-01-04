import React from "react";
import { PAYMENT_METHOD_LABELS } from "@/constant/general";
import { formatCurrency, formatDate } from "@/utils/format";

const CoursePaymentItem = ({ paymentMethod, createdAt, course }) => {
  const paymentMethodLabel = PAYMENT_METHOD_LABELS[paymentMethod];
  return (
    <div className="itemhistory">
      <div className="name">{course?.name}</div>
      <div className="payment">{paymentMethodLabel}</div>
      <div className="date">{formatDate(createdAt)}</div>
      <div className="money">{formatCurrency(course?.price)} VND</div>
    </div>
  );
};

export default CoursePaymentItem;
