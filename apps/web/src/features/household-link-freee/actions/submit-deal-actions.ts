"use server";

import { AxiosFreeeRegisterDealRepository } from "@kageco/persistence/api/axios/freee/axios-freee-register-deal-repository";
import { CreateFreeeLinkDetailDocument } from "@v3/graphql/household/schema/feeee/createFreeeLinkDetail.generated";

import { TZDateTime } from "@/util/date/date";
import { generateId } from "../../../function/generateId";
import { findFreeeAuth } from "../../../persistence/browser/server/freee-auth";
import { execMutation } from "../../../persistence/database/server/execMutation";
import type { UnifiedRecord } from "../types/unified-record";
import { convertToDealData } from "./convert-to-deal-data";

export const submitDealActions = async (record: UnifiedRecord) => {
  const freeeAuth = await findFreeeAuth();

  const dealData = convertToDealData(record);
  const repository = new AxiosFreeeRegisterDealRepository(freeeAuth);
  await repository.exec({ ...dealData, companyId: freeeAuth.companyId });

  await execMutation(CreateFreeeLinkDetailDocument, {
    object: {
      id: generateId(),
      detailId: record.id,
      linkedDatetime: TZDateTime.valueOf(new Date()).toString(),
    },
  });
};
