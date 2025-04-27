import type { FreeeTransactionData } from "../../domain/household/freee/freee-record";

/**
 * freee API取引登録ゲートウェイのインターフェース
 */
export interface RegisterTransactionGateway {
  /**
   * freeeへ取引データを送信する
   * @param transactionData 取引データ
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  registerTransaction(
    transactionData: FreeeTransactionData,
  ): Promise<{ success: boolean }>;
}
