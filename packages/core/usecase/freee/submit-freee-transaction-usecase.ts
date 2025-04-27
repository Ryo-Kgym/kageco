import type {
  FreeeRecord,
  FreeeTransactionData,
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

    // レコードを取引データに変換
    const transactionData = this.convertToTransactionData(records);

    // リポジトリを通じてデータを送信
    return this.freeeTransactionGateway.registerTransaction(transactionData);
  }

  /**
   * レコードを取引データに変換する
   * @param records 取引レコード
   * @returns 取引データ
   */
  private convertToTransactionData(
    records: FreeeRecord[],
  ): FreeeTransactionData {
    if (!records || records.length === 0) {
      throw new Error("レコードが提供されていません");
    }

    // レコードを処理して、取引データ形式に変換
    const processedRecords = records.map((record) => {
      // 基本情報は各レコードで同じなので、最初のレコードから取得
      const formData = {
        issueDate: record.issueDate,
        type: record.type,
        companyId: record.companyId
          ? Number.parseInt(record.companyId, 10)
          : null,
        dueDate: record.dueDate,
        partnerId: record.partnerId
          ? Number.parseInt(record.partnerId, 10)
          : null,
        partnerCode: record.partnerCode,
        refNumber: record.refNumber,
      };

      // 明細情報
      const detail = {
        taxCode: record.taxCode ? Number.parseInt(record.taxCode, 10) : null,
        accountItemId: record.accountItemId
          ? Number.parseInt(record.accountItemId, 10)
          : null,
        amount: record.amount ? Number.parseInt(record.amount, 10) : null,
        itemId: record.itemId ? Number.parseInt(record.itemId, 10) : null,
        sectionId: record.sectionId
          ? Number.parseInt(record.sectionId, 10)
          : null,
        tagIds: record.tagIds
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
        fromWalletableId: record.fromWalletableId
          ? Number.parseInt(record.fromWalletableId, 10)
          : null,
        fromWalletableType: record.fromWalletableType,
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

    // 取引データ形式に変換
    return {
      ...processedRecords[0].formData, // 基本情報は最初のレコードから取得
      details: processedRecords.map((record) => record.detail),
      payments: processedRecords.map((record) => record.payment),
      receiptIds: processedRecords
        .map((record) => record.receiptId)
        .filter(Boolean) as number[],
    };
  }
}
