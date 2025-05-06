import type { RegisterDealDto } from "../../usecase/freee/register-deal-dto";

/**
 * freee API取引登録ゲートウェイのインターフェース
 */
export interface FreeeRegisterDealGateway {
  /**
   * freeeへ取引データを送信する
   * @param dealData 取引データ
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  exec(dealData: RegisterDealDto): Promise<{ success: boolean }>;
}
