import moment from "moment";
import { TIME_DISPLAY } from "../constant/format-date";

export const formatCurrency = (data, type = "vi-VN") => {
  if (!data) return 0;
  return data.toLocaleString(type);
};

export const formatDate = (date, format = TIME_DISPLAY.DATE) => {
  if (!!!date) return "";
  return moment.utc(date).format(format);
};
