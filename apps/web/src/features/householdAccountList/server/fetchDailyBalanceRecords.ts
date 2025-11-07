import { GetDetailsByAccountIdDocument } from "@v3/graphql/household/type";

import { IocomeType } from "../../../domain/model/household/IocomeType";
import { execQuery } from "../../../persistence/database/server/execQuery";
import type { DailyBalanceRow } from "../types/dailyBalanceRow";

export const fetchDailyBalanceRecords = async (params: {
  accountId: string;
  fromDate: Date;
  toDate: Date;
}): Promise<{
  records: DailyBalanceRow[];
  incomeTotal: number;
  outcomeTotal: number;
}> => {
  const { data } = await execQuery(GetDetailsByAccountIdDocument, {
    ...params,
  });

  const records = [
    ...(data?.account?.dailies.map((daily) => ({
      id: daily.id,
      type: "daily" as const,
      date: daily.date,
      genre: daily.genre.name,
      iocomeType: daily.genre.iocomeType as IocomeType,
      category: daily.category.name,
      amount: daily.amount,
      memo: daily.memo ?? "",
      tags: daily.tags.map((tag) => ({
        id: tag.tag.id,
        label: tag.tag.name,
        colorCode: tag.tag.colorCode,
      })),
    })) ?? []),
    ...(data?.account?.credits.map((credit) => ({
      id: credit.id,
      type: "credit" as const,
      date: credit.date,
      genre: "クレジットカード",
      iocomeType: IocomeType.Outcome,
      category: credit.creditCard,
      amount: credit.amount,
      memo: "",
      tags: [],
    })) ?? []),
  ].sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  });

  return {
    records,
    incomeTotal: totalRecords(records, IocomeType.Income),
    outcomeTotal: totalRecords(records, IocomeType.Outcome),
  };
};

const totalRecords = (records: DailyBalanceRow[], iocomeType: IocomeType) =>
  records.filter((c) => c.iocomeType === iocomeType).reduce((a, b) => a + b.amount, 0);
