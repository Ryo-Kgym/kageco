"use server";

import type { YYYY_MM_DD } from "@/util/date/date";
import { CreateDailyDetailDocument } from "@v3/graphql/household/schema/mutation/create/CreateDailyDetail.generated";

import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { generateId } from "../../../function/generateId";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execMutation } from "../../../persistence/database/server/execMutation";

export const registerDailyDetail = async ({
  date,
  genreId,
  iocomeType,
  categoryId,
  accountId,
  amount,
  memo,
}: {
  date: YYYY_MM_DD;
  genreId: string;
  iocomeType: IocomeType;
  categoryId: string;
  accountId: string;
  amount: number;
  memo?: string;
}) => {
  const {
    id: userId,
    group: { id: groupId },
  } = await findUser();

  await execMutation(CreateDailyDetailDocument, {
    id: generateId(),
    date,
    amount,
    accountId,
    genreId,
    iocomeType,
    categoryId,
    memo: memo ?? "",
    groupId,
    userId,
  });
};
