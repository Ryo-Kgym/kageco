// https://developer.freee.co.jp/reference/accounting/reference#operations-tag-Taxes
export type FreeeTaxesGateway = {
  /**
   * すべての税区分を取得する
   * @returns 税区分のリスト
   */
  getAll: () => Promise<{
    taxes: [
      {
        code: number;
        name: string;
        name_ja: string;
        display_category: string;
        available: boolean;
      },
    ];
  }>;
};
