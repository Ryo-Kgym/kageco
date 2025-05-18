import { useGetCreditCardSummaryByDateQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { CreditCardSummary } from "~/hooks/household/credit_card/credit-card-type";
import {
  getCreditCardGenreName,
  getCreditCardIocomeType,
  getCreditCardName,
} from "~/hooks/household/credit_card/get-label";
import type { CreditCard } from "~/types/credit-card";

export const useGetCreditCardSummaryList = ({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate: Date;
}) => {
  const { groupId } = useSaveGroupId();

  const [{ data, fetching: loading }] = useGetCreditCardSummaryByDateQuery({
    variables: {
      groupId,
      fromDate,
      toDate,
    },
  });

  const creditCardSummaryList: CreditCardSummary[] =
    data?.creditCardSummaries.map((c) => ({
      id: c.id,
      withdrawalDate: c.withdrawalDate ? new Date(c.withdrawalDate) : undefined,
      genre: {
        name: getCreditCardGenreName(),
        iocomeType: getCreditCardIocomeType(),
      },
      category: {
        name: getCreditCardName(c.creditCard as CreditCard),
      },
      account: {
        id: c.account.id,
        name: c.account.name,
      },
      total: c.totalAmount as number,
    })) ?? [];

  return { creditCardSummaryList, loading };
};
