"use server";

import { UpdateCategoryByIdDocument } from "@v3/graphql/household/schema/mutation/update/UpdateCategoryById.generated";

import { execMutation } from "../../../persistence/database/server/execMutation";

export const updateCategoryById = async (params: {
  categoryId: string;
  categoryName: string;
  genreId: string;
  validFlag: boolean;
  displayOrder: number;
}) => {
  const { data } = await execMutation(UpdateCategoryByIdDocument, {
    categoryId: params.categoryId,
    categoryName: params.categoryName,
    genreId: params.genreId,
    validFlag: params.validFlag,
    displayOrder: params.displayOrder,
  });

  if (!data.updateCategoryByPk) {
    throw new Error("カテゴリの更新に失敗しました");
  }

  return { success: true };
};
