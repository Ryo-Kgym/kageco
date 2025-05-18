import type { YYYY_MM_DD } from "@/util/date/date";

export const convertToYmd = (date: Date): YYYY_MM_DD => {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return `${date.getFullYear()}-${mm.toString().padStart(2, "0")}-${dd.toString().padStart(2, "0")}`;
};
