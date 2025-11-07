import {
  OrderBy,
  useGetCreditCardSummaryByAccountIdQuery,
  useGetDailyByAccountIdQuery,
} from "@v3/graphql/household";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";

import { paths } from "~/app/paths";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { getCreditCardGenreName, getCreditCardName } from "~/hooks/household/credit_card/get-label";
import type { CreditCard } from "~/types/credit-card";
import type { IocomeType } from "~/types/iocome-type";
import { Details } from "~/ui";

export const DetailListByAccountContainer = ({
  accountId,
}: {
  accountId: string;
}) => {
  const { groupId } = useSaveGroupId();
  const { push } = useRouter();
  const [{ data: dailyDetail }] = useGetDailyByAccountIdQuery({
    variables: {
      accountId,
      groupId,
      fromDate: "2019-01-01",
      toDate: "2099-12-31",
      orderBy: OrderBy.Desc,
    },
  });
  const [{ data: creditCardSummary }] = useGetCreditCardSummaryByAccountIdQuery({
    variables: {
      accountId,
      fromDate: "2019-01-01",
      toDate: "2099-12-31",
    },
    pause: !accountId,
  });

  const details: ComponentProps<typeof Details>["details"] = [
    ...(dailyDetail?.dailies.map((d) => ({
      id: d.id,
      date: d.date ? new Date(d.date) : undefined,
      amount: (d.amount as number) ?? 0,
      categoryName: d.category.name,
      genreName: d.genre.name,
      iocomeType: d.genre.iocomeType as IocomeType,
      redirectHandler: () => push(paths.household.daily({ id: d.id })),
      memo: d.memo ?? null,
      type: "daily" as const,
    })) ?? []),
    ...(creditCardSummary?.creditCardSummaries.map((d) => ({
      id: d.id,
      date: d.withdrawalDate ? new Date(d.withdrawalDate) : undefined,
      amount: (d.totalAmount as number) ?? 0,
      categoryName: getCreditCardName(d.creditCard as CreditCard),
      genreName: getCreditCardGenreName(),
      iocomeType: "OUTCOME" as IocomeType,
      redirectHandler: () =>
        push(paths.household.detailListByCreditCardSummary({ summaryId: d.id })),
      memo: null,
      type: "creditCardSummary" as const,
    })) ?? []),
  ].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.getTime() - a.date.getTime();
  });

  return <Details details={details} />;
};
