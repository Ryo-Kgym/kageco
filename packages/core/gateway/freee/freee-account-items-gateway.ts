// https://developer.freee.co.jp/reference/accounting/reference#operations-tag-Account%20items
export type FreeeAccountItemsGateway = {
  /**
   * すべての勘定科目を取得する
   * @returns 勘定科目のリスト
   */
  getAll: () => Promise<{
    account_items: [
      {
        id: string;
        name: string;
        tax_code: number;
        shortcut: string;
        shortcut_num: string;
        code: string;
        default_tax_code: number;
        account_category: string;
        account_category_id: number;
        categories: string[];
        available: boolean;
        walletable_id: number;
        group_name: string;
        group_id: number;
        corresponding_income_name: string;
        corresponding_income_id: number;
        corresponding_expense_name: string;
        corresponding_expense_id: number;
      },
    ];
  }>;
};
