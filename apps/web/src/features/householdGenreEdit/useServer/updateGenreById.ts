"use server";

import { UpdateGenreByIdDocument } from "@v3/graphql/household/schema/mutation/update/UpdateGenreById.generated";

import type { GenreType } from "../../../domain/model/household/GenreType";
import type { IocomeType } from "../../../domain/model/household/IocomeType";
import { execMutation } from "../../../persistence/database/server/execMutation";

export const updateGenreById = async (params: {
  genreId: string;
  genreName: string;
  genreType: GenreType;
  iocomeType: IocomeType;
  validFlag: boolean;
  displayOrder: number;
}) => {
  const { data } = await execMutation(UpdateGenreByIdDocument, {
    genreId: params.genreId,
    genreName: params.genreName,
    genreType: params.genreType,
    iocomeType: params.iocomeType,
    validFlag: params.validFlag,
    displayOrder: params.displayOrder,
  });

  if (!data.updateGenreByPk) {
    throw new Error("ジャンルの更新に失敗しました");
  }

  return { success: true };
};
