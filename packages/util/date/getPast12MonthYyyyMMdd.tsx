import { convertToYmd } from "./convertToYmd";
import { YYYYmmDD } from "./date";

export const getPast12MonthYyyyMMdd = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 12);
  return new YYYYmmDD(convertToYmd(date));
};
