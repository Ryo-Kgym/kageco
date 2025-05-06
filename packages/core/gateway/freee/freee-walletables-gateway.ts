// https://developer.freee.co.jp/reference/accounting/reference#operations-tag-Walletables
export type FreeeWalletablesGateway = {
  /**
   * すべての口座を取得する
   * @returns 口座のリスト
   */
  getAll: () => Promise<{
    walletables: [
      {
        id: number;
        name: string;
        bank_id: number;
        type: string;
        last_synced_at: string; //"2019-01-01T00:00:00+09:00";
        sync_status: string;
        last_balance: number;
        walletable_balance: number;
      },
    ];
    meta: {
      up_to_date: boolean;
    };
  }>;
};
