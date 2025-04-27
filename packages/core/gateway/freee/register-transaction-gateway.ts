import type { FreeeApiRequestData } from "../../domain/household/freee/freee-record";

/**
 * freee API取引登録ゲートウェイのインターフェース
 */
export interface RegisterTransactionGateway {
  /**
   * freeeへ取引データを送信する
   * @param requestData APIリクエスト用のデータ
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  registerTransaction(
    requestData: FreeeApiRequestData,
  ): Promise<{ success: boolean }>;
}
