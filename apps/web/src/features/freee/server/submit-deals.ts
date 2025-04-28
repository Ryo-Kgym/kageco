import { RegisterDealRepository } from "@/core/gateway/freee/register-deal-repository";
import { RegisterDealsUsecase } from "@/core/usecase/freee/register-deals-usecase";
import type { UnifiedRecord } from "../types/unified-record";
import { convertToDealData } from "./convert-to-deal-data";

export const submitDeals = async (records: UnifiedRecord[]) => {
  if (!records || records.length === 0) {
    throw new Error("レコードが提供されていません");
  }

  const inputData = records.map((record) => ({
    id: record.id,
    // 基本情報
    issueDate: record.issueDate,
    type: record.type,
    companyId: record.companyId,
    dueDate: record.dueDate,
    partnerId: record.partnerId,
    partnerCode: record.partnerCode,
    refNumber: record.refNumber,
    // 明細情報
    taxCode: record.taxCode,
    accountItemId: record.accountItemId,
    amount: record.amount,
    itemId: record.itemId,
    sectionId: record.sectionId,
    tagIds: record.tagIds,
    description: record.description,
    vat: record.vat,
    // 支払情報
    paymentAmount: record.paymentAmount,
    fromWalletableId: record.fromWalletableId,
    fromWalletableType: record.fromWalletableType,
    paymentDate: record.paymentDate,
    // 領収書ID
    receiptId: record.receiptId,
  }));

  const dealDataArray = convertToDealData(inputData);

  const repository = new RegisterDealRepository();
  const usecase = new RegisterDealsUsecase(repository);

  try {
    const results = await Promise.all(
      dealDataArray.map(async (dealData) => {
        return await usecase.execute(dealData);
      }),
    );

    // すべての結果が成功した場合はtrue、1つでも失敗した場合はfalse
    return {
      success: results.every((result) => result.success),
    };
  } catch (error) {
    console.error("Error registering data:", error);
    throw error;
  }
};
