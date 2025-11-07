import type { YYYY_MM_DD } from "@/util/date/date";
import { GetCreditCardSummaryByAccountIdDocument } from "@v3/graphql/household/schema/query/v3/getCreditCardSummaryByAccountId.generated";
import { GetDailyByAccountIdDocument } from "@v3/graphql/household/schema/query/v3/getDailyByAccountId.generated";

import { IocomeType } from "../../../domain/model/household/IocomeType";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import type { AccountDetailRow } from "../types/accountDetailRow";

type Params = {
  fromDate: YYYY_MM_DD;
  toDate: YYYY_MM_DD;
  accountId: string;
};
export const fetchAccountDetailList = async (params: Params) => {
  const { group } = await findUser();

  const { data: dailyData } = await execQuery(GetDailyByAccountIdDocument, {
    groupId: group.id,
    accountId: params.accountId,
    fromDate: params.fromDate,
    toDate: params.toDate,
  });
  const { data: creditData } = await execQuery(GetCreditCardSummaryByAccountIdDocument, {
    groupId: group.id,
    accountId: params.accountId,
    fromDate: params.fromDate,
    toDate: params.toDate,
  });

  const dailies: AccountDetailRow[] =
    dailyData?.dailies.map((d) => ({
      type: "daily",
      id: d.id,
      date: new Date(d.date),
      iocomeType: d.genre.iocomeType as IocomeType,
      genre: d.genre.name,
      category: d.category.name,
      amount: d.amount,
      memo: d.memo ?? "",
      tags: d.tags.map((tag) => ({
        id: tag.tag.id,
        label: tag.tag.name,
        colorCode: tag.tag.colorCode,
      })),
    })) ?? [];

  const credits: AccountDetailRow[] =
    creditData?.creditCardSummaries.map((s) => ({
      type: "credit",
      id: s.id,
      date: new Date(s.withdrawalDate),
      iocomeType: IocomeType.Outcome,
      genre: "クレジットカード",
      category: s.creditCard,
      amount: s.totalAmount,
      memo: "",
      tags: [],
    })) ?? [];

  return {
    records: dailies.concat(credits).sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    }),
    ...totalAmount(dailies.concat(credits)),
  };
};

const totalAmount = (data: AccountDetailRow[]) => {
  return {
    incomeTotal: data
      .filter((d) => d.iocomeType === IocomeType.Income)
      .reduce((acc, cur) => acc + cur.amount, 0),
    outcomeTotal: data
      .filter((d) => d.iocomeType === IocomeType.Outcome)
      .reduce((acc, cur) => acc + cur.amount, 0),
  };
};
