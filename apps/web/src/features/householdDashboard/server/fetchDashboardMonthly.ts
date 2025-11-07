"use server";

import { GetDetailsByCategoryDocument } from "@v3/graphql/household/schema/query/v5/getDetailsByCategory.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import type { DashboardComponentProps } from "../types/dashboardFC";
import { buildParams } from "./buildParams";
import { convertToNominal } from "./convertToNominal";

type Results = {
  income: Nominal;
  outcome: Nominal;
};

export type Nominal = {
  total: number;
  details: {
    id: string;
    name: string;
    amount: number;
  }[];
};

export const fetchDashboardMonthly = async (params: DashboardComponentProps): Promise<Results> => {
  const { group } = await findUser();
  const { firstDay, lastDay } = buildParams(params);

  const { data: outcomeData } = await execQuery(GetDetailsByCategoryDocument, {
    fromDate: firstDay.toString(),
    toDate: lastDay.toString(),
    groupId: group.id,
    iocomeType: "OUTCOME",
  });

  const outcome = convertToNominal(outcomeData);

  const { data: incomeData } = await execQuery(GetDetailsByCategoryDocument, {
    fromDate: firstDay.toString(),
    toDate: lastDay.toString(),
    groupId: group.id,
    iocomeType: "INCOME",
  });

  const income = convertToNominal(incomeData);

  return {
    income,
    outcome,
  };
};
