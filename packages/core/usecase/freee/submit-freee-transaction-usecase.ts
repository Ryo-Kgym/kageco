import type {
  FreeeApiRequestData,
  FreeeRecord,
} from "../../domain/household/freee/freee-record";
import type { RegisterTransactionGateway } from "../../gateway/freee/register-transaction-gateway";

/**
 * freeeへ取引データを送信するユースケース
 */
export class SubmitFreeeTransactionUsecase {
  constructor(
    private readonly freeeTransactionGateway: RegisterTransactionGateway,
  ) {}

  /**
   * freeeへ取引データを送信する
   * @param records 取引レコード
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  async execute(records: FreeeRecord[]): Promise<{ success: boolean }> {
    if (!records || records.length === 0) {
      throw new Error("レコードが提供されていません");
    }

    // レコードをAPIリクエスト用のデータに変換
    const requestData = this.convertToApiRequestData(records);

    // APIにデータを送信
    return this.freeeTransactionGateway.registerTransaction(requestData);
  }

  /**
   * レコードをAPIリクエスト用のデータに変換する
   * @param records 取引レコード
   * @returns APIリクエスト用のデータ
   */
  private convertToApiRequestData(records: FreeeRecord[]): FreeeApiRequestData {
    if (!records || records.length === 0) {
      throw new Error("レコードが提供されていません");
    }

    // レコードを処理して、APIに送信するデータ形式に変換
    const processedRecords = records.map((record) => {
      // 基本情報は各レコードで同じなので、最初のレコードから取得
      const formData = {
        issue_date: record.issueDate,
        type: record.type,
        company_id: record.companyId
          ? Number.parseInt(record.companyId, 10)
          : null,
        due_date: record.dueDate,
        partner_id: record.partnerId
          ? Number.parseInt(record.partnerId, 10)
          : null,
        partner_code: record.partnerCode,
        ref_number: record.refNumber,
      };

      // 明細情報
      const detail = {
        tax_code: record.taxCode ? Number.parseInt(record.taxCode, 10) : null,
        account_item_id: record.accountItemId
          ? Number.parseInt(record.accountItemId, 10)
          : null,
        amount: record.amount ? Number.parseInt(record.amount, 10) : null,
        item_id: record.itemId ? Number.parseInt(record.itemId, 10) : null,
        section_id: record.sectionId
          ? Number.parseInt(record.sectionId, 10)
          : null,
        tag_ids: record.tagIds
          .map((id) => (id ? Number.parseInt(id, 10) : null))
          .filter(Boolean) as number[],
        description: record.description,
        vat: record.vat ? Number.parseInt(record.vat, 10) : null,
      };

      // 支払情報
      const payment = {
        amount: record.paymentAmount
          ? Number.parseInt(record.paymentAmount, 10)
          : null,
        from_walletable_id: record.fromWalletableId
          ? Number.parseInt(record.fromWalletableId, 10)
          : null,
        from_walletable_type: record.fromWalletableType,
        date: record.paymentDate,
      };

      // 領収書ID
      const receiptId = record.receiptId
        ? Number.parseInt(record.receiptId, 10)
        : null;

      return {
        formData,
        detail,
        payment,
        receiptId,
      };
    });

    // APIに送信するデータ形式に変換
    return {
      ...processedRecords[0].formData, // 基本情報は最初のレコードから取得
      details: processedRecords.map((record) => record.detail),
      payments: processedRecords.map((record) => record.payment),
      receipt_ids: processedRecords
        .map((record) => record.receiptId)
        .filter(Boolean) as number[],
    };
  }
}
