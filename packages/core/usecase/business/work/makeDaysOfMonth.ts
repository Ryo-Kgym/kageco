import { convertToYmd } from "@/util/date/convertToYmd";
import { YYYYmmDD } from "@/util/date/date";

export const makeDaysOfMonth = (baseDate: YYYYmmDD) => {
  const date = baseDate.parseDate();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  return Array.from(
    { length: 31 },
    (_, i) => new Date(firstDay.getFullYear(), firstDay.getMonth(), i + 1),
  )
    .filter((d) => d.getMonth() === firstDay.getMonth())
    .map((d) => new YYYYmmDD(convertToYmd(d)));
};
