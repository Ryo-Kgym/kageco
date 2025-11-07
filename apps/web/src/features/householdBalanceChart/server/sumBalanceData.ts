import type { YYYY_MM } from "@/util/date/date";
import type { ChartDataQuery } from "@v3/graphql/household/schema/query/v5/chartData.generated";

import type { SumBalance } from "./types";

export const sumBalanceData = (data: ChartDataQuery): SumBalance => {
  const transferIncomeCategoryId = data.transferCategory?.incomeCategoryId;
  const transferOutcomeCategoryId = data.transferCategory?.outcomeCategoryId;

  return data.detailView?.reduce<SumBalance>((sum, cur) => {
    const yearMonth = cur.withdrawalDate?.slice(0, 7) as YYYY_MM; // yyyy-mm
    const amount = cur.amount ?? 0;

    if (!yearMonth) {
      throw new Error("withdrawalDate is required");
    }

    if (!(yearMonth in sum)) {
      return {
        ...sum,
        [yearMonth]: {
          income: isIncome(cur, [transferIncomeCategoryId ?? ""]) ? amount : 0,
          outcome: isOutcome(cur, [transferOutcomeCategoryId ?? ""]) ? amount : 0,
          deposit: isDeposit(cur) ? amount : 0,
          diff: cur.iocomeType === "INCOME" ? amount : -amount,
        },
      };
    }
    const thisYearMonth = sum[yearMonth] as SumBalance[YYYY_MM];
    return {
      ...sum,
      [yearMonth]: {
        income:
          thisYearMonth.income + (isIncome(cur, [transferIncomeCategoryId ?? ""]) ? amount : 0),
        outcome:
          thisYearMonth.outcome + (isOutcome(cur, [transferOutcomeCategoryId ?? ""]) ? amount : 0),
        deposit: thisYearMonth.deposit + (isDeposit(cur) ? amount : 0),
        diff: thisYearMonth.diff + (cur.iocomeType === "INCOME" ? amount : -amount),
      },
    };
  }, {});
};

const isIncome = (cur: NonNullable<ChartDataQuery>["detailView"][number], ignoreIds: string[]) => {
  return cur.iocomeType === "INCOME" && ignoreIds.every((id) => id !== cur.category?.id);
};

const isOutcome = (cur: NonNullable<ChartDataQuery>["detailView"][number], ignoreIds: string[]) => {
  return (
    cur.iocomeType === "OUTCOME" &&
    !cur.category?.depositCategory &&
    ignoreIds.every((id) => id !== cur.category?.id)
  );
};

const isDeposit = (cur: NonNullable<ChartDataQuery>["detailView"][number]) => {
  return cur.category?.depositCategory;
};
