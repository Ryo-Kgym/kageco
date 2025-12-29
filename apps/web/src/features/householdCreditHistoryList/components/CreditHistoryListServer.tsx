import { GetCreditCardListDocument } from "@v3/graphql/household/schema/query/get/GetCreditCardList.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import { CreditHistoryTable } from "./credit-history-table";

export const CreditHistoryListServer = async () => {
  const { group } = await findUser();

  const { data } = await execQuery(GetCreditCardListDocument, {
    groupId: group.id,
  });

  const creditHistoryList = data.allCreditCardSummariesList.map((d) => ({
    id: d.id,
    withdrawalDate: d.withdrawalDate,
    creditCard: d.creditCard,
    accountName: d.account?.name,
    totalAmount: d.totalAmount,
  }));

  return <CreditHistoryTable creditHistoryList={creditHistoryList} />;
};
