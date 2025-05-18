import type { YYYY_MM_DD } from "@/util/date/date";

import jaDayjs from "./locale/ja-dayjs";

export const convertToYmd = (date: Date): YYYY_MM_DD => {
  return jaDayjs.toInstance(date).format("YYYY-MM-DD") as YYYY_MM_DD;
};
