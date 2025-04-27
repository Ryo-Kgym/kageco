import type {
  FreeeApiRequestData,
  FreeeTransactionData,
} from "@/core/domain/household/freee/freee-record";
import type { RegisterTransactionGateway } from "@/core/gateway/freee/register-transaction-gateway";

/**
 * freee API取引登録ゲートウェイの実装
 */
export class RegisterTransactionRepository
  implements RegisterTransactionGateway
{
  /**
   * freeeへ取引データを送信する
   * @param transactionData 取引データ
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  async registerTransaction(
    transactionData: FreeeTransactionData,
  ): Promise<{ success: boolean }> {
    try {
      // camelCaseからsnake_caseへ変換
      const requestData = this.convertToApiRequestData(transactionData);

      // ここでAPIリクエストを送信
      console.log("送信データ:", requestData);

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
   * @param transactionData 取引データ
   * @returns APIリクエスト用のデータ
   */
  private convertToApiRequestData(
    transactionData: FreeeTransactionData,
  ): FreeeApiRequestData {
    return {
      // 基本情報
      issue_date: transactionData.issueDate,
      type: transactionData.type,
      company_id: transactionData.companyId,
      due_date: transactionData.dueDate,
      partner_id: transactionData.partnerId,
      partner_code: transactionData.partnerCode,
      ref_number: transactionData.refNumber,
      // 明細情報
      details: transactionData.details.map((detail) => ({
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
      payments: transactionData.payments.map((payment) => ({
        amount: payment.amount,
        from_walletable_id: payment.fromWalletableId,
        from_walletable_type: payment.fromWalletableType,
        date: payment.date,
      })),
      // 領収書ID
      receipt_ids: transactionData.receiptIds,
    };
  }
}
