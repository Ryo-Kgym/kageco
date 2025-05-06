import type { FreeeRegisterDealGateway } from "@/core/gateway/freee/freee-register-deal-gateway";
import type { RegisterDealDto } from "@/core/usecase/freee/register-deal-dto";
import { AxiosFreeeRepository } from "./axios-freee-repository";

export class AxiosFreeeRegisterDealRepository
  extends AxiosFreeeRepository
  implements FreeeRegisterDealGateway
{
  async exec(dealData: RegisterDealDto): Promise<{ success: boolean }> {
    const requestBody = this.convertToApiRequestBody(dealData);

    // ここでAPIリクエストを送信
    console.log("送信データ:", requestBody);

    // curl -X POST "https://api.freee.co.jp/api/1/deals"
    // -H "accept: application/json"
    // -H "Authorization: Bearer xxxxxxxxxxxx"
    // -H "Content-Type: application/json"
    // -H "X-Api-Version: 2020-06-15"
    // -d "{ \"issue_date\": \"2025-05-04\", \"type\": \"expense\", \"company_id\": 11022348, \"details\": [ { \"tax_code\": 129, \"account_item_id\": 777145435, \"amount\": 9999, \"description\": \"ライセンス-test\", } ], \"payments\": [ { \"amount\": 9999, \"from_walletable_id\": 3468330, \"from_walletable_type\": \"bank_account\", \"date\": \"2025-05-04\" } ],}"
    await super.axiosPost({ endpointSuffix: "/deals", requestBody });

    return {
      success: true,
    };
  }

  /**
   * 取引データをAPIリクエスト用のデータに変換する（camelCase → snake_case）
   * @param dealData 取引データ
   * @returns APIリクエスト用のデータ
   */
  private convertToApiRequestBody(dealData: RegisterDealDto): DealRequestBody {
    return {
      // 基本情報
      issue_date: dealData.issueDate,
      type: dealData.type,
      company_id: dealData.companyId,
      due_date: dealData.dueDate || undefined,
      partner_id: dealData.partnerId || undefined,
      partner_code: dealData.partnerCode || undefined,
      ref_number: dealData.refNumber || undefined,
      // 明細情報
      details: dealData.details.map((detail) => ({
        tax_code: detail.taxCode,
        account_item_id: detail.accountItemId,
        amount: detail.amount,
        item_id: detail.itemId || undefined,
        section_id: detail.sectionId || undefined,
        tag_ids: detail.tagIds || undefined,
        segment_1_tag_id: undefined,
        segment_2_tag_id: undefined,
        segment_3_tag_id: undefined,
        description: detail.description || undefined,
        vat: detail.vat || undefined,
      })),
      // 支払情報
      payments:
        dealData.payments?.map((payment) => ({
          amount: payment.amount,
          from_walletable_id: payment.fromWalletableId,
          from_walletable_type: payment.fromWalletableType,
          date: payment.date,
        })) ?? undefined,
      // 領収書ID
      receipt_ids: dealData.receiptIds || undefined,
    };
  }
}

type DealRequestBody = {
  // 基本情報
  issue_date: string;
  type: "income" | "expense";
  company_id: number;
  due_date: string | undefined;
  partner_id: number | undefined;
  partner_code: string | undefined;
  ref_number: string | undefined;
  // 明細情報
  details: Array<{
    tax_code: number;
    account_item_id: number;
    amount: number;
    item_id: number | undefined;
    section_id: number | undefined;
    tag_ids: number[] | undefined;
    segment_1_tag_id: number | undefined;
    segment_2_tag_id: number | undefined;
    segment_3_tag_id: number | undefined;
    description: string | undefined;
    vat: number | undefined;
  }>;
  // 支払情報
  payments:
    | Array<{
        amount: number;
        from_walletable_id: number;
        from_walletable_type:
          | "bank_account"
          | "credit_card"
          | "wallet"
          | "private_account_item";
        date: string;
      }>
    | undefined;
  // 領収書ID
  receipt_ids: number[] | undefined;
};
