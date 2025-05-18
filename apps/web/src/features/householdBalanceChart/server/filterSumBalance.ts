import type { YYYY_MM_DD } from "@/util/date/date";

import type { SumBalanceAttributes } from "./types";

export const filterSumBalance = <T extends SumBalanceAttributes>(
  data: Record<string, T>,
  fromDate: YYYY_MM_DD,
) => {
  return Object.fromEntries(
    Object.entries(data).filter(([date]) => date >= fromDate),
  );
};
