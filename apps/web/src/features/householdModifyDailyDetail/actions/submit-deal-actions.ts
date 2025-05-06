"use server";

import { AxiosFreeeRegisterDealRepository } from "@kageco/persistence/api/axios/freee/axios-freee-register-deal-repository";

import { findFreeeAuth } from "../../../persistence/browser/server/freee-auth";
import type { UnifiedRecord } from "../types/unified-record";
import { convertToDealData } from "./convert-to-deal-data";

export const submitDealActions = async (record: UnifiedRecord) => {
  const freeeAuth = await findFreeeAuth();

  const dealData = convertToDealData(record);
  const repository = new AxiosFreeeRegisterDealRepository(freeeAuth);
  await repository.exec({ ...dealData, companyId: freeeAuth.companyId });
};
