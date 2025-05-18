import { useGetCreditCardDetailListQuery } from "@v3/graphql/household";

import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import type { CreditCardDetail } from "~/hooks/household/credit_card/credit-card-type";
import type { IocomeType } from "~/types/iocome-type";

export const useGetCreditCardDetailList = ({
  fromDate,
  toDate,
}: {
  fromDate: Date;
  toDate: Date;
}) => {
  const { groupId } = useSaveGroupId();
  const [{ data }] = useGetCreditCardDetailListQuery({
    variables: {
      fromDate: fromDate.toISOString().slice(0, 10),
      toDate: toDate.toISOString().slice(0, 10),
      groupId,
    },
  });

  const creditCardDetailList: CreditCardDetail[] =
    data?.creditCardDetails.map((d) => ({
      id: d.id,
      date: new Date(d.date ?? 0) ?? new Date(),
      genre: {
        id: d.genre.id,
        name: d.genre.name,
        iocomeType: d.genre.iocomeType as IocomeType,
      },
      category: {
        id: d.category.id,
        name: d.category.name,
      },
      account: {
        id: d.summary.account.id,
        name: d.summary.account.name,
      },
      amount: d.amount as number,
      memo: d.memo ?? null,
      summaryId: d.summary.id,
    })) ?? [];

  return { creditCardDetailList };
};
