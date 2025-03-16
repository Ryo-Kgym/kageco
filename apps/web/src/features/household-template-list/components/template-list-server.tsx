import { GetTemplateListDocument } from "@v3/graphql/household/schema/template/get-template.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";
import { TemplateListClient } from "./template-list-client";

export const TemplateListServer = async () => {
  const { group } = await findUser();

  const { data } = await execQuery(GetTemplateListDocument, {
    groupId: group.id,
  });
  const templates =
    data.group?.templates.map((template) => ({
      id: template.id,
      name: template.name,
      accountId: template.accountId,
      genreId: template.genreId,
      iocomeType: template.iocomeType,
      categoryId: template.categoryId,
      amount: template.amount,
      memo: template.memo,
    })) ?? [];

  return <TemplateListClient templates={templates} />;
};
