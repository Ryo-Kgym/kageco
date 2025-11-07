import { InsertConditionSessionDocument } from "@v3/graphql/household/schema/mutation/v5/mutateConditionSession.generated";

import { execMutation } from "../../database/server/execMutation";
import { findUser } from "../server/find-user";
import { sessionKeyBuilder } from "../sessionKeyBuilder";

export const insertConditionSession = async (key: string, value: string[], dataType: string) => {
  const { group } = await findUser();

  await execMutation(InsertConditionSessionDocument, {
    groupId: group.id,
    key: sessionKeyBuilder({ name: key, groupId: group.id }),
    value,
    dataType,
  });
};
