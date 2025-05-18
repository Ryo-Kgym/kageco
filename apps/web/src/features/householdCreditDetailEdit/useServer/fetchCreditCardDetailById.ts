"use server";

import { GetCreditCardDetailByIdDocument } from "@v3/graphql/household/schema/query/v5/getCreditCardDetailById.generated";

import type { YYYY_MM_DD } from "@/util/date/date";
import { IocomeType } from "../../../domain/model/household/IocomeType";
import { execQuery } from "../../../persistence/database/server/execQuery";

export const fetchCreditCardDetailById = async (id: string) => {
  const { data } = await execQuery(GetCreditCardDetailByIdDocument, {
    id,
  });

  const initData = {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    date: data?.creditCardDetail?.date!,
    iocomeType:
      (data?.creditCardDetail?.genre?.iocomeType as IocomeType) ??
      IocomeType.Income,
    genreId: data?.creditCardDetail?.genre?.id ?? "",
    categoryId: data?.creditCardDetail?.category?.id ?? "",
    amount: Number(data?.creditCardDetail?.amount) ?? "",
    memo: data?.creditCardDetail?.memo ?? "",
    tags: data?.creditCardDetail?.tags.map((tag) => tag.tag.id) ?? [],
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    withdrawalDate: data?.creditCardDetail?.summary.withdrawalDate!,
  } satisfies {
    date: YYYY_MM_DD;
    iocomeType: IocomeType;
    genreId: string;
    categoryId: string;
    amount: number;
    memo: string;
    tags: string[];
    withdrawalDate: YYYY_MM_DD;
  };

  return {
    initData,
  };
};
