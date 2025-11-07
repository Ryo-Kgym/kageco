import { useGetCreditCardDetailByIdQuery } from "@v3/graphql/household";

import type { CreditCardDetail } from "~/hooks/household/credit_card/credit-card-type";
import type { IocomeType } from "~/types/iocome-type";

export const useGetCreditCardDetailById = ({ id }: { id: string }) => {
  const [{ data, fetching: loading }] = useGetCreditCardDetailByIdQuery({
    variables: {
      id,
    },
  });

  const creditCardDetail: CreditCardDetail = {
    id: data?.creditCardDetail?.id ?? "",
    date: data?.creditCardDetail?.date ? new Date(data?.creditCardDetail?.date) : undefined,
    account: data?.creditCardDetail?.summary.account ?? { id: "", name: "" },
    amount: (data?.creditCardDetail?.amount as number) ?? 0,
    category: data?.creditCardDetail?.category ?? { id: "", name: "" },
    genre: {
      id: data?.creditCardDetail?.genre?.id ?? "",
      name: data?.creditCardDetail?.genre?.name ?? "",
      iocomeType: data?.creditCardDetail?.genre?.iocomeType as IocomeType,
    },
    memo: data?.creditCardDetail?.memo ?? null,
    summaryId: data?.creditCardDetail?.summary.id ?? "",
  };

  return { creditCardDetail, loading };
};
