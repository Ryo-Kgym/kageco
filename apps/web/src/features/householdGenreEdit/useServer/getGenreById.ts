"use server";

import { GetGenreByIdDocument } from "@v3/graphql/household/schema/query/v5/getGenreById.generated";

import type { GenreType } from "../../../domain/model/household/GenreType";
import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { execQuery } from "../../../persistence/database/server/execQuery";

export type GenreData = {
  genreName: string;
  genreType: GenreType;
  iocomeType: IocomeType;
  displayOrder: number;
  validFlag: boolean;
  categories: {
    categoryId: string;
    categoryName: string;
  }[];
};

export const getGenreById = async (params: {
  genreId: string;
}): Promise<GenreData> => {
  const { data } = await execQuery(GetGenreByIdDocument, {
    genreId: params.genreId,
  });

  if (!data.genreById) {
    throw new Error("ジャンルが見つかりませんでした");
  }

  return {
    genreName: data.genreById.genreName,
    genreType: data.genreById.genreType as GenreType,
    iocomeType: data.genreById.iocomeType as IocomeType,
    displayOrder: data.genreById.displayOrder,
    validFlag: data.genreById.validFlag ?? true,
    categories: data.genreById.categories.map((category) => ({
      categoryId: category.categoryId,
      categoryName: category.categoryName,
    })),
  };
};
