// https://developer.freee.co.jp/reference/accounting/reference#operations-tag-Partners
export type FreeePartnersGateway = {
  /**
   * すべての取引先を取得する
   * @returns 取引先のリスト
   */
  getAll: () => Promise<{
    partners: [
      {
        id: number;
        code: string;
        company_id: number;
        name: string;
        update_date: string;
        available: boolean;
        shortcut1: string;
        shortcut2: string;
        org_code: number;
        country_code: string;
        long_name: string;
        name_kana: string;
        default_title: string;
        phone: string;
        contact_name: string;
        email: string;
        payer_walletable_id: number;
        transfer_fee_handling_side: string;
        qualified_invoice_issuer: boolean;
        invoice_registration_number: string;
        address_attributes: {
          zipcode: string;
          prefecture_code: number;
          street_name1: string;
          street_name2: string;
        };
        partner_doc_setting_attributes: {
          sending_method: string;
        };
        partner_bank_account_attributes: {
          bank_name: string;
          bank_name_kana: string;
          bank_code: string;
          branch_name: string;
          branch_kana: string;
          branch_code: string;
          account_type: string;
          account_number: string;
          account_name: string;
          long_account_name: string;
        };
      },
    ];
  }>;
};
