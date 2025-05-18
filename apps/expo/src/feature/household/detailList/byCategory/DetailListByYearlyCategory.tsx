import { useRouter } from "expo-router";
import type { ComponentProps } from "react";

import { paths } from "~/app/paths";
import { getYear } from "~/func/date/get-year";
import { useGetCreditCardDetailList } from "~/hooks/household/credit_card/useGetCreditCardDetailList";
import { useGetDailyList } from "~/hooks/household/daily/useGetDailyList";
import { Details, sortBy } from "~/ui";

export const DetailListByYearlyCategory = ({
  year,
  categoryId,
}: {
  year: Date;
  categoryId: string;
}) => {
  const { firstDayOfYear, lastDateNotGreaterThanToday } = getYear(year);
  const { push } = useRouter();

  const { dailyDetailList } = useGetDailyList({
    fromDate: firstDayOfYear,
    toDate: lastDateNotGreaterThanToday,
  });
  const { creditCardDetailList } = useGetCreditCardDetailList({
    fromDate: firstDayOfYear,
    toDate: lastDateNotGreaterThanToday,
  });

  const details: ComponentProps<typeof Details>["details"] = [
    ...dailyDetailList
      .filter((d) => d.category.id === categoryId)
      .map((d) => ({
        id: d.id,
        date: d.date,
        accountName: d.account.name,
        amount: d.amount,
        categoryId: d.category.id,
        categoryName: d.category.name,
        genreName: d.genre.name,
        iocomeType: d.genre.iocomeType,
        redirectHandler: () => push(paths.household.daily({ id: d.id })),
        memo: d.memo,
        type: "daily",
      })),
    ...creditCardDetailList
      .filter((d) => d.category.id === categoryId)
      .map((d) => ({
        id: d.id,
        date: d.date,
        accountName: d.account.name,
        amount: d.amount,
        categoryId: d.category.id,
        categoryName: d.category.name,
        genreName: d.genre.name,
        iocomeType: d.genre.iocomeType,
        redirectHandler: () =>
          push(paths.household.creditCardDetail({ id: d.id })),
        memo: d.memo,
        type: "creditCardDetail",
      })),
  ].sort(sortBy.date.desc);

  return <Details details={details} />;
};
