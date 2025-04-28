import type { FreeeRegisterDealGateway } from "../../gateway/freee/freee-register-deal-gateway";
import type { RegisterDealDto } from "./register-deal-dto";

/**
 * freeeへ取引データを登録するユースケース
 */
export class RegisterDealsUsecase {
  constructor(private readonly registerDealGateway: FreeeRegisterDealGateway) {}

  /**
   * freeeへ取引データを登録する
   * @param dealData 変換済みの取引データ
   * @returns 成功した場合はtrue、失敗した場合はfalse
   */
  async execute(dealData: RegisterDealDto): Promise<{ success: boolean }> {
    if (!dealData) {
      throw new Error("取引データが提供されていません");
    }

    // リポジトリを通じてデータを登録
    return this.registerDealGateway.exec(dealData);
  }
}

export type RegisterDealsInput = {
  id: string;
  // 基本情報
  issueDate: string;
  type: string;
  companyId: string | null;
  dueDate: string;
  partnerId: string | null;
  partnerCode: string;
  refNumber: string;
  // 明細情報
  taxCode: string | null;
  accountItemId: string | null;
  amount: string | null;
  itemId: string | null;
  sectionId: string | null;
  tagIds: string[];
  description: string;
  vat: string | null;
  // 支払情報
  paymentAmount: string | null;
  fromWalletableId: string | null;
  fromWalletableType: string;
  paymentDate: string;
  // 領収書ID
  receiptId: string | null;
};
