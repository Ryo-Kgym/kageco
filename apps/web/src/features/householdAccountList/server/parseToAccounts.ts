import type { GetAccountBalanceListQuery } from "@v3/graphql/household/type";
import type { AccountBalance } from "features/householdAccountList/types/accountBalance";

export const convertToAccounts = (data: GetAccountBalanceListQuery): AccountBalance[] => {
  return data.account.map((a) => ({
    id: a.id,
    accountName: a.accountName,
    balance: a.allDetailViewsAggregate.aggregate?.sum?.signedAmount,
  }));
};

export const totalBalance = (data: GetAccountBalanceListQuery): number => {
  return data.account.reduce(
    (acc, cur) => Number(cur.allDetailViewsAggregate.aggregate?.sum?.signedAmount) + acc,
    0,
  );
};
