"use server";

import { InsertTemplateDocument } from "@v3/graphql/household/schema/template/insert-template.generated";

import { generateId } from "../../../function/generateId";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execMutation } from "../../../persistence/database/server/execMutation";
import type { TemplateForm } from "../types/template-form";

export const insertTemplate = async (form: TemplateForm) => {
  const { group } = await findUser();

  const input = {
    id: generateId(),
    groupId: group.id,
    name: form.name,
    accountId: form.accountId,
    genreId: form.genreId,
    categoryId: form.categoryId,
    iocomeType: form.iocomeType,
    amount: form.amount,
    memo: form.memo,
  };

  await execMutation(InsertTemplateDocument, { input });
};
