"use server";

import { CreateDailyDetailDocument } from "@v3/graphql/household/schema/mutation/create/CreateDailyDetail.generated";

import type { DailyDetail } from "../../../domain/model/household/DailyDetail";
import { generateId } from "../../../function/generateId";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execMutation } from "../../../persistence/database/server/execMutation";

export const duplicateDailyDetail = async (params: Omit<DailyDetail, "id">) => {
  const {
    id: userId,
    group: { id: groupId },
  } = await findUser();

  await execMutation(CreateDailyDetailDocument, {
    id: generateId(),
    date: params.date,
    amount: params.amount,
    genreId: params.genreId,
    categoryId: params.categoryId,
    accountId: params.accountId,
    memo: params.memo,
    iocomeType: params.iocomeType,
    groupId,
    userId,
  });
};
