import { useRouter } from "expo-router";
import type { ComponentProps } from "react";

import { paths } from "~/app/paths";
import { useGetCreditCardDetailList } from "~/hooks/household/credit_card/useGetCreditCardDetailList";
import { useGetDailyList } from "~/hooks/household/daily/useGetDailyList";
import { useConvertFavoriteFilter } from "~/hooks/household/favoriteFilter/useConvertFavoriteFilter";
import { Details, sortBy } from "~/ui";

export const DetailListByFavoriteFilter = ({
  filterId,
}: {
  filterId: string;
}) => {
  const {
    filter: { categoryIdList, fromDate, toDate },
  } = useConvertFavoriteFilter(filterId);

  const { push } = useRouter();

  const { dailyDetailList } = useGetDailyList({
    fromDate,
    toDate,
  });
  const { creditCardDetailList } = useGetCreditCardDetailList({
    fromDate,
    toDate,
  });

  const details: ComponentProps<typeof Details>["details"] = [
    ...dailyDetailList
      .filter((d) => categoryIdList.includes(d.category.id))
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
        type: "daily" as const,
      })),
    ...creditCardDetailList
      .filter((d) => categoryIdList.includes(d.category.id))
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
        type: "creditCardDetail" as const,
      })),
  ].sort(sortBy.date.desc);

  return <Details details={details} />;
};
