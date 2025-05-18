import { useRouter } from "expo-router";

import { paths } from "~/app/paths";
import { useGetCreditCardDetailBySummaryId } from "~/hooks/household/credit_card/useGetCreditCardDetailBySummaryId";
import type { Detail } from "~/ui";
import { Details } from "~/ui";

export const DetailListByCreditCardSummaryContainer = ({
  summaryId,
}: {
  summaryId: string;
}) => {
  const { push } = useRouter();
  const { creditCardDetailList } = useGetCreditCardDetailBySummaryId({
    summaryId,
  });

  const details: Detail[] = creditCardDetailList.map((detail) => ({
    id: detail.id,
    date: detail.date,
    categoryName: detail.category.name,
    genreName: detail.genre.name,
    memo: detail.memo,
    amount: detail.amount,
    iocomeType: detail.genre.iocomeType,
    redirectHandler: () =>
      push(paths.household.creditCardDetail({ id: detail.id })),
  }));

  return <Details details={details} />;
};
