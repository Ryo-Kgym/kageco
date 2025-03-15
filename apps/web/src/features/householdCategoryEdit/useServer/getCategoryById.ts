"use server";

import { GetCategoryByIdDocument } from "@v3/graphql/household/schema/query/get/GetCategoryById.generated";

import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { execQuery } from "../../../persistence/database/server/execQuery";

export type CategoryData = {
  categoryName: string;
  displayOrder: number;
  validFlag: boolean;
  genre: {
    genreId: string;
    iocomeType: IocomeType;
  };
};

export const getCategoryById = async (params: {
  categoryId: string;
}): Promise<CategoryData> => {
  const { data } = await execQuery(GetCategoryByIdDocument, {
    categoryId: params.categoryId,
  });

  if (!data.category) {
    throw new Error("カテゴリが見つかりませんでした");
  }

  return {
    categoryName: data.category.categoryName,
    displayOrder: data.category.displayOrder,
    validFlag: data.category.validFlag ?? true,
    genre: {
      genreId: data.category.genre.genreId,
      iocomeType: data.category.genre.iocomeType as IocomeType,
    },
  };
};
