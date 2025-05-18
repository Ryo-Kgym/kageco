import { useGetCreditCardSummaryByIdQuery } from "@v3/graphql/household";

import type { CreditCardSummary } from "~/hooks/household/credit_card/credit-card-type";
import {
  getCreditCardIocomeType,
  getCreditCardName,
} from "~/hooks/household/credit_card/get-label";
import type { CreditCard } from "~/types/credit-card";

export const useGetCreditCardSummaryById = ({
  summaryId,
}: {
  summaryId: string;
}) => {
  const [{ data }] = useGetCreditCardSummaryByIdQuery({
    variables: {
      summaryId,
    },
  });

  const creditCardSummary: CreditCardSummary = {
    id: data?.creditCardSummary?.id ?? "",
    withdrawalDate: data?.creditCardSummary?.withdrawalDate
      ? new Date(data?.creditCardSummary?.withdrawalDate)
      : undefined,
    genre: {
      name: getCreditCardName(
        data?.creditCardSummary?.creditCard as CreditCard,
      ),
      iocomeType: getCreditCardIocomeType(),
    },
    category: { name: getCreditCardIocomeType() },
    account: {
      id: data?.creditCardSummary?.account?.id ?? "",
      name: data?.creditCardSummary?.account?.name ?? "",
    },
    total: data?.creditCardSummary?.totalAmount ?? 0,
  };

  return { creditCardSummary };
};
