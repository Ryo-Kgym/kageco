"use server";

import { DeleteCreditSummaryDocument } from "@v3/graphql/household/schema/mutation/v5/mutateCreditSummary.generated";
import { execMutation } from "../../../../persistence/database/server/execMutation";

export const deleteCreditSummaryAction = async (params: {
  id: string;
}) => {
  await execMutation(DeleteCreditSummaryDocument, {
    id: params.id,
  });
};
