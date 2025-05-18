"use server";

import { UpdateDailyDetailByIdDocument } from "@v3/graphql/household/schema/mutation/update/UpdateDailyDetailById.generated";

import { convertToYmd } from "@/util/date/convertToYmd";
import type { IocomeType } from "../../../../domain/model/household/IocomeType";
import { execMutation } from "../../../../persistence/database/server/execMutation";

export const updateDailyDetailBySerialNo = async (params: {
  id: string;
  date: Date;
  genreId: string;
  iocomeType: IocomeType;
  categoryId: string;
  accountId: string;
  amount: number;
  memo: string | null;
}) => {
  // Dateオブジェクトを適切な形式に変換
  const dateStr = convertToYmd(params.date);

  const { data } = await execMutation(UpdateDailyDetailByIdDocument, {
    id: params.id,
    date: dateStr,
    genreId: params.genreId,
    iocomeType: params.iocomeType,
    categoryId: params.categoryId,
    accountId: params.accountId,
    amount: params.amount,
    memo: params.memo,
    tagDetails: [], // FIXME 未実装
  });

  if (!data.updateDailyDetailByPk) {
    throw new Error("Failed to update daily detail");
  }

  return { success: true };
};
