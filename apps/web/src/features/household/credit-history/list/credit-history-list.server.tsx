import type { YYYY_MM_DD_HH_MM_SS } from "@/util/date/date";
import { GetCreditCardListDocument } from "@v3/graphql/household/schema/query/get/GetCreditCardList.generated";
import { execQuery } from "../../../../persistence/database/server/execQuery";
import { CreditHistoryTable } from "./credit-history-table";

export const CreditHistoryListServer = async ({
  groupId,
}: { groupId: string }) => {
  const { data } = await execQuery(GetCreditCardListDocument, {
    groupId,
  });

  const records = data.allCreditCardSummariesList.map((d) => ({
    id: d.id,
    withdrawalDate: d.withdrawalDate,
    creditCard: d.creditCard,
    accountName: d.account?.name,
    totalAmount: d.totalAmount,
    totalCount: d.count,
    importDatetime: d.fileImportHistory?.importDatetime as YYYY_MM_DD_HH_MM_SS,
    error: (() => {
      if (d.count !== d.details.length) {
        return `明細の数と一致していません。明細の数: ${d.details.length}`;
      }
      const detailsTotalAmount = d.details.reduce((a, c) => {
        return a + c.amount;
      }, 0);

      if (d.totalAmount !== detailsTotalAmount) {
        return `明細の合計と一致していません。明細の合計: ${detailsTotalAmount}`;
      }
    })(),
  }));

  return <CreditHistoryTable records={records} />;
};
