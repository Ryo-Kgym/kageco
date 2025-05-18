import { convertToYmd } from "@/core/function/date/convertToYmd";
import { YYYYmmDD } from "@/util/date/date";

export const getPast12MonthYyyyMMdd = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 12);
  return new YYYYmmDD(convertToYmd(date));
};
