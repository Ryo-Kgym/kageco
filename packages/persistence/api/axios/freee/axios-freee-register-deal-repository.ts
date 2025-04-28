import type { FreeeRegisterDealGateway } from "@/core/gateway/freee/freee-register-deal-gateway";
import type { RegisterDealDto } from "@/core/usecase/freee/register-deal-dto";

export class AxiosFreeeRegisterDealRepository
  implements FreeeRegisterDealGateway
{
  async exec(dealData: RegisterDealDto): Promise<{ success: boolean }> {
    try {
      // camelCaseからsnake_caseへ変換
      const requestBody = this.convertToApiRequestBody(dealData);

      // ここでAPIリクエストを送信
      console.log("送信データ:", requestBody);

      // 実際のAPI呼び出しはここに実装する
      // 例: const response = await fetch('https://api.freee.co.jp/...', { ... });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error submitting data:", error);
      throw error;
    }
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
      due_date: dealData.dueDate,
      partner_id: dealData.partnerId,
      partner_code: dealData.partnerCode,
      ref_number: dealData.refNumber,
      // 明細情報
      details: dealData.details.map((detail) => ({
        tax_code: detail.taxCode,
        account_item_id: detail.accountItemId,
        amount: detail.amount,
        item_id: detail.itemId,
        section_id: detail.sectionId,
        tag_ids: detail.tagIds,
        description: detail.description,
        vat: detail.vat,
      })),
      // 支払情報
      payments: dealData.payments.map((payment) => ({
        amount: payment.amount,
        from_walletable_id: payment.fromWalletableId,
        from_walletable_type: payment.fromWalletableType,
        date: payment.date,
      })),
      // 領収書ID
      receipt_ids: dealData.receiptIds,
    };
  }
}

type DealRequestBody = {
  // 基本情報
  issue_date: string;
  type: string;
  company_id: number | null;
  due_date: string;
  partner_id: number | null;
  partner_code: string;
  ref_number: string;
  // 明細情報
  details: Array<{
    tax_code: number | null;
    account_item_id: number | null;
    amount: number | null;
    item_id: number | null;
    section_id: number | null;
    tag_ids: number[];
    description: string;
    vat: number | null;
  }>;
  // 支払情報
  payments: Array<{
    amount: number | null;
    from_walletable_id: number | null;
    from_walletable_type: string;
    date: string;
  }>;
  // 領収書ID
  receipt_ids: number[];
};
