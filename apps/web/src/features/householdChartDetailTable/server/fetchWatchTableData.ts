import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";
import {
  ChartDetailTableFilterSettlementDateDocument,
  ChartDetailTableFilterWithdrawalDateDocument,
} from "@v3/graphql/household/schema/query/v5/chartDetailTable.generated";

import { convertToYmd } from "@/util/date/convertToYmd";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import type { ChartDetailTableRow } from "../types/chartDetailTableRow";

export const fetchWatchTableData = async ({
  watchFirstDate,
  dateType,
}: {
  watchFirstDate: YYYYmmDD;
  dateType: "withdrawalDate" | "settlementDate";
}): Promise<{
  records: ChartDetailTableRow[];
  incomeTotal: number;
  outcomeTotal: number;
}> => {
  // watchFirstDate から月末日を生成する
  const watchLastDate = getLastDateOfMonth(watchFirstDate.parseDate());

  const { group } = await findUser();

  const query =
    dateType === "withdrawalDate"
      ? ChartDetailTableFilterWithdrawalDateDocument
      : ChartDetailTableFilterSettlementDateDocument;

  const { data } = await execQuery(query, {
    groupId: group.id,
    fromDate: watchFirstDate.toString(),
    toDate: watchLastDate.toString(),
  });

  const records = data?.detailView.map((rec) => ({
    id: rec.id as string,
    type: rec.type as string,
    withdrawalDate: rec.withdrawalDate as YYYY_MM_DD,
    settlementDate: rec.settlementDate as YYYY_MM_DD,
    amount: rec.amount as number,
    iocomeType: rec.iocomeType as IocomeType,
    accountId: rec.account?.id ?? "",
    accountName: rec.account?.name ?? "",
    genreId: rec.genre?.id ?? "",
    genreName: rec.genre?.name ?? "",
    categoryId: rec.category?.id ?? "",
    categoryName: rec.category?.name ?? "",
    memo: rec.memo ?? "",
    isDeposit: !!rec.category?.depositCategory,
    tags: rec.tags.map((tag) => ({
      label: tag.tag.name,
      value: tag.tag.id,
      colorCode: tag.tag.colorCode,
    })),
  }));

  return {
    records,
    incomeTotal: calcTotal(records, IocomeType.Income, [
      data?.transfer?.incomeCategoryId ?? "",
    ]),
    outcomeTotal: calcTotal(records, IocomeType.Outcome, [
      data?.transfer?.outcomeCategoryId ?? "",
    ]),
  };
};

const getLastDateOfMonth = (date: Date) => {
  return new YYYYmmDD(
    convertToYmd(new Date(date.getFullYear(), date.getMonth() + 1, 0)),
  );
};

const calcTotal = (
  records: ChartDetailTableRow[],
  type: IocomeType,
  ignoreIds: string[],
) => {
  return records
    .filter((rec) => rec.iocomeType === type)
    .filter((rec) => !ignoreIds.includes(rec.categoryId))
    .reduce((acc, rec) => {
      return acc + rec.amount;
    }, 0);
};
