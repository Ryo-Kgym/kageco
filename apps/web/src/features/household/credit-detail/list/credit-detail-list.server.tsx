import { GetCreditCardDetailBySummaryIdDocument } from "@v3/graphql/household/schema/query/v5/getCreditCardDetailBySummaryId.generated";

import type { IocomeType } from "../../../../domain/model/household/IocomeType";
import { execQuery } from "../../../../persistence/database/server/execQuery";
import { CreditDetailTable } from "./credit-detail-table";

export const CreditDetailListServer = async ({
  creditCardSummaryId,
}: {
  creditCardSummaryId: string;
}) => {
  const { data } = await execQuery(GetCreditCardDetailBySummaryIdDocument, {
    id: creditCardSummaryId,
  });

  if (!data?.creditCardSummary) {
    throw new Error("creditCardSummary not found");
  }

  const summary = {
    id: data.creditCardSummary.id,
    creditCard: data.creditCardSummary.creditCard,
    withdrawalDate: new Date(data.creditCardSummary.withdrawalDate),
    accountId: data.creditCardSummary.account.id,
    totalAmount: data.creditCardSummary.totalAmount,
    count: data.creditCardSummary.creditCardDetails.length,
    error: (() => {
      if (
        data.creditCardSummary.count !==
        data.creditCardSummary.creditCardDetails.length
      ) {
        return `明細の件数と一致しません。明細の件数: ${data.creditCardSummary.creditCardDetails.length}`;
      }
    })(),
  };

  const details =
    data.creditCardSummary.creditCardDetails.map((d) => ({
      id: d.id,
      date: d.date,
      genreName: d.genre.name,
      categoryName: d.category.name,
      iocomeType: d.genre.iocomeType as IocomeType,
      amount: d.amount,
      memo: d.memo ?? "",
      tags: d.tags.map((t) => ({
        label: t.tag.name,
        value: t.tag.id,
        colorCode: t.tag.colorCode,
      })),
    })) ?? [];

  return (
    <CreditDetailTable
      creditCardSummaryId={creditCardSummaryId}
      summary={summary}
      details={details}
    />
  );
};
