"use server";

import { GetDashboardBalanceDocument } from "@v3/graphql/household/schema/query/v5/getDashboardBalance.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";

type Results = {
  cash: number;
  investment: number;
  total: number;
  currentDatetime: Date;
};

export const fetchDashboardBalance = async ({
  favoriteFilterId,
}: {
  favoriteFilterId: string;
}): Promise<Results> => {
  favoriteFilterId;
  const { group } = await findUser();

  const { data } = await execQuery(GetDashboardBalanceDocument, {
    groupId: group.id,
  });

  const accounts = data.account;
  const cash = accounts.reduce((acc, account) => {
    const amount =
      account.allDetailViewsAggregate.aggregate?.sum?.signedAmount ?? 0;
    return acc + amount;
  }, 0);

  return {
    cash,
    investment: 0,
    total: cash,
    currentDatetime: new Date(),
  };
};
