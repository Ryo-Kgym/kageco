import type { YYYY_MM, YYYYmmDD } from "@/util/date/date";
import { GetCategorizedDetailsDocument } from "@v3/graphql/household/schema/query/v5/getCategorizedDetails.generated";

import { IocomeType } from "../../../domain/model/household/IocomeType";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import type { RowAttribute } from "../components/MonthlySummaryTable";

export const fetchMonthlySummaryRecords = async (
  fromDate: YYYYmmDD,
  toDate: YYYYmmDD,
  categoryIds: string[],
  accountIds: string[],
) => {
  const { group } = await findUser();

  const { data } = await execQuery(GetCategorizedDetailsDocument, {
    groupId: group.id,
    fromDate: fromDate.toString(),
    toDate: toDate.toString(),
    categoryIds,
    accountIds,
  });

  const convertToRecords = (iocomeType: IocomeType) =>
    data.categories
      .filter(
        (category) => category.genre.iocomeType === (iocomeType as string),
      )
      .map((category) => {
        const yyyyMMGroupedDetails = category.details.reduce(
          (acc, detail) => {
            const yyyymm = detail?.settlementDate?.slice(0, 7) as YYYY_MM;
            if (!yyyymm) return acc;

            if (acc[yyyymm]) {
              acc[yyyymm] = acc[yyyymm] + (detail.amount ?? 0);
            } else {
              acc[yyyymm] = detail.amount ?? 0;
            }
            return acc;
          },
          {} as Record<YYYY_MM, number>,
        );

        const total = Object.values(yyyyMMGroupedDetails).reduce(
          (acc, amount) => acc + amount,
          0,
        );

        return {
          id: category.id,
          categoryName: category.name,
          iocomeType,
          ...yyyyMMGroupedDetails,
          total,
        } as RowAttribute;
      })
      .filter((record) => record.total !== 0)
      .sort((a, b) => b.total - a.total);

  const convertToTotalRecord = (
    records: ReturnType<typeof convertToRecords>,
  ) => {
    const monthlyTotal = records.reduce(
      (acc, record) => {
        Object.entries(record).forEach(([key, value]) => {
          if (
            key === "id" ||
            key === "categoryName" ||
            key === "iocomeType" ||
            key === "total" ||
            typeof value !== "number"
          )
            return;

          acc[key] = (acc[key] ?? 0) + value;
        });
        return acc;
      },
      {} as Record<string, number>,
    );

    return {
      ...monthlyTotal,
      id: "total",
      categoryName: "合計",
      iocomeType: records[0]?.iocomeType ?? IocomeType.Income,
      total: Object.values(monthlyTotal).reduce(
        (acc, amount) => acc + amount,
        0,
      ),
    } as RowAttribute;
  };

  const incomeRecords = convertToRecords(IocomeType.Income);
  const outcomeRecords = convertToRecords(IocomeType.Outcome);

  const columns = Object.fromEntries(
    Object.keys(convertToTotalRecord(incomeRecords))
      .filter(
        (key) =>
          key !== "id" &&
          key !== "categoryName" &&
          key !== "total" &&
          key !== "iocomeType",
      )
      .sort()
      .map((key) => [key, { title: key }]),
  );

  return {
    columns,
    details: [...incomeRecords, ...outcomeRecords],
    total: [
      convertToTotalRecord(incomeRecords),
      convertToTotalRecord(outcomeRecords),
    ],
  };
};
