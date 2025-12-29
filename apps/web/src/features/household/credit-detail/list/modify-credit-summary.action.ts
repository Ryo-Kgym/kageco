"use server";

import { UpdateCreditSummaryDocument } from "@v3/graphql/household/schema/mutation/v5/mutateCreditSummary.generated";
import { execMutation } from "../../../../persistence/database/server/execMutation";
import type { SummaryFormState } from "./summary-form-state";

export const modifyCreditSummaryAction = async (
  params: {
    id: string;
  } & SummaryFormState,
) => {
  await execMutation(UpdateCreditSummaryDocument, {
    id: params.id,
    form: {
      creditCard: params.creditCard,
      withdrawalDate: params.withdrawalDate,
      accountId: params.accountId,
    },
  });
};
