"use server";

import { type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";
import { CreateDailyDetailDocument } from "@v3/graphql/household/schema/mutation/create/CreateDailyDetail.generated";
import { GetTransferCategoryByDocument } from "@v3/graphql/household/schema/query/v5/getTransferCategory.generated";

import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { generateId } from "../../../function/generateId";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execMutation } from "../../../persistence/database/server/execMutation";
import { execQuery } from "../../../persistence/database/server/execQuery";

export const registerTransfer = async ({
  date,
  sendAccountId,
  receiveAccountId,
  amount,
  memo,
}: {
  date: YYYY_MM_DD;
  sendAccountId: string;
  receiveAccountId: string;
  amount: number;
  memo?: string;
}) => {
  const {
    id: userId,
    group: { id: groupId },
  } = await findUser();

  const { data } = await execQuery(GetTransferCategoryByDocument, {
    groupId,
  });

  const _registerDaily = async ({
    accountId,
    genreId,
    iocomeType,
    categoryId,
  }: {
    accountId: string;
    genreId: string;
    iocomeType: IocomeType;
    categoryId: string;
  }) =>
    await execMutation(CreateDailyDetailDocument, {
      accountId: accountId,
      amount: amount,
      genreId,
      iocomeType,
      categoryId,
      date,
      groupId,
      id: generateId(),
      memo: memo ?? "",
      userId,
    });

  await _registerDaily({
    accountId: sendAccountId,
    genreId: data?.transferCategory?.outcomeCategory.genre.genreId ?? "",
    iocomeType: data?.transferCategory?.outcomeCategory.genre
      .iocomeType as IocomeType,
    categoryId: data?.transferCategory?.outcomeCategory.categoryId ?? "",
  });
  await _registerDaily({
    accountId: receiveAccountId,
    genreId: data?.transferCategory?.incomeCategory.genre.genreId ?? "",
    iocomeType: data?.transferCategory?.incomeCategory.genre
      .iocomeType as IocomeType,
    categoryId: data?.transferCategory?.incomeCategory.categoryId ?? "",
  });
};
