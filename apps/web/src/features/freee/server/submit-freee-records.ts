import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeへ取引データを送信する関数
 */
export const submitFreeeRecords = async (records: UnifiedRecord[]) => {
  if (!records || records.length === 0) {
    throw new Error("レコードが提供されていません");
  }

  // レコードを処理して、APIに送信するデータ形式に変換
  const processedRecords = records.map((record) => {
    // 基本情報は各レコードで同じなので、最初のレコードから取得
    const formData = {
      issue_date: record.issue_date,
      type: record.type,
      company_id: record.company_id
        ? Number.parseInt(record.company_id, 10)
        : null,
      due_date: record.due_date,
      partner_id: record.partner_id
        ? Number.parseInt(record.partner_id, 10)
        : null,
      partner_code: record.partner_code,
      ref_number: record.ref_number,
    };

    // 明細情報
    const detail = {
      tax_code: record.tax_code ? Number.parseInt(record.tax_code, 10) : null,
      account_item_id: record.account_item_id
        ? Number.parseInt(record.account_item_id, 10)
        : null,
      amount: record.amount ? Number.parseInt(record.amount, 10) : null,
      item_id: record.item_id ? Number.parseInt(record.item_id, 10) : null,
      section_id: record.section_id
        ? Number.parseInt(record.section_id, 10)
        : null,
      tag_ids: record.tag_ids
        .map((id) => (id ? Number.parseInt(id, 10) : null))
        .filter(Boolean),
      description: record.description,
      vat: record.vat ? Number.parseInt(record.vat, 10) : null,
    };

    // 支払情報
    const payment = {
      amount: record.payment_amount
        ? Number.parseInt(record.payment_amount, 10)
        : null,
      from_walletable_id: record.from_walletable_id
        ? Number.parseInt(record.from_walletable_id, 10)
        : null,
      from_walletable_type: record.from_walletable_type,
      date: record.payment_date,
    };

    // 領収書ID
    const receiptId = record.receipt_id
      ? Number.parseInt(record.receipt_id, 10)
      : null;

    return {
      formData,
      detail,
      payment,
      receiptId,
    };
  });

  // APIに送信するデータ形式に変換
  const requestData = {
    ...processedRecords[0].formData, // 基本情報は最初のレコードから取得
    details: processedRecords.map((record) => record.detail),
    payments: processedRecords.map((record) => record.payment),
    receipt_ids: processedRecords
      .map((record) => record.receiptId)
      .filter(Boolean),
  };

  try {
    // ここでAPIリクエストを送信
    console.log("送信データ:", requestData);

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error submitting data:", error);
    throw error;
  }
};
