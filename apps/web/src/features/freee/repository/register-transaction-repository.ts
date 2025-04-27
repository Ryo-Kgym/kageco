import type { FreeeApiRequestData } from "@/core/domain/household/freee/freee-record";
import type { RegisterTransactionGateway } from "@/core/gateway/freee/register-transaction-gateway";

/**
 * freee API取引登録ゲートウェイの実装
 */
export class RegisterTransactionRepository
  implements RegisterTransactionGateway
{
  /**
   * freeeへ取引データを送信する
   * @param requestData APIリクエスト用のデータ
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  async registerTransaction(
    requestData: FreeeApiRequestData,
  ): Promise<{ success: boolean }> {
    try {
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
}
