import { useGetDailyDetailByDateQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { Daily } from "~/hooks/household/daily/daily";
import type { IocomeType } from "~/types/iocome-type";

export const useGetDailyList = ({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate: Date;
}) => {
  const { groupId } = useSaveGroupId();

  const [{ data: detailData }] = useGetDailyDetailByDateQuery({
    variables: {
      groupId,
      fromDate: fromDate.toISOString().slice(0, 10),
      toDate: toDate.toISOString().slice(0, 10),
    },
  });

  const dailyDetailList: Daily[] =
    detailData?.dailies.map((detail) => ({
      id: detail.id,
      date: new Date(detail.date ?? 0) ?? new Date(),
      genre: {
        id: detail.genre.id,
        name: detail.genre.name,
        iocomeType: detail.genre.iocomeType as IocomeType,
      },
      category: {
        id: detail.category.id,
        name: detail.category.name,
      },
      account: {
        id: detail.account.id,
        name: detail.account.name,
      },
      amount: detail.amount as number,
      memo: detail.memo ?? null,
    })) ?? [];

  const incomeTotal = dailyDetailList.reduce(
    (acc, cur) => (cur.genre.iocomeType === "INCOME" ? acc + cur.amount : acc),
    0,
  );

  const outcomeTotal = dailyDetailList.reduce(
    (acc, cur) => (cur.genre.iocomeType === "OUTCOME" ? acc + cur.amount : acc),
    0,
  );

  return { dailyDetailList, incomeTotal, outcomeTotal };
};
