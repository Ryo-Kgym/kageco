"use client";

import type { FC } from "react";
import { useState } from "react";

import { Button } from "../../../components/ui/button/v5";
import { errorPopup, successPopup } from "../../../function/successPopup";
import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeへ取引登録するフォームコンポーネント
 */
export const FreeeInsertForm: FC<{ initialRecords?: UnifiedRecord[] }> = ({
  initialRecords = [],
}) => {
  // 統合されたレコードのフォームデータ
  const [records, setRecords] = useState<UnifiedRecord[]>(
    initialRecords.length > 0
      ? initialRecords
      : [
          {
            id: "record-1",
            // 基本情報
            issue_date: "",
            type: "income",
            company_id: "",
            due_date: "",
            partner_id: "",
            partner_code: "",
            ref_number: "",
            // 明細情報
            tax_code: "",
            account_item_id: "",
            amount: "",
            item_id: "",
            section_id: "",
            tag_ids: [""],
            description: "",
            vat: "",
            // 支払情報
            payment_amount: "",
            from_walletable_id: "",
            from_walletable_type: "bank_account",
            payment_date: "",
            // 領収書ID
            receipt_id: "",
          },
        ],
  );

  // レコードの入力ハンドラ
  const handleRecordChange = (index: number, field: string, value: string) => {
    const newRecords = [...records];
    if (field === "tag_ids") {
      // tag_idsは配列なので特別に処理
      newRecords[index][field] = [value];
    } else {
      newRecords[index][field] = value;
    }
    setRecords(newRecords);
  };

  // レコード行の追加
  const addRecordRow = () => {
    const newId = `record-${records.length + 1}`;
    setRecords([
      ...records,
      {
        id: newId,
        // 基本情報
        issue_date: "",
        type: "income",
        company_id: "",
        due_date: "",
        partner_id: "",
        partner_code: "",
        ref_number: "",
        // 明細情報
        tax_code: "",
        account_item_id: "",
        amount: "",
        item_id: "",
        section_id: "",
        tag_ids: [""],
        description: "",
        vat: "",
        // 支払情報
        payment_amount: "",
        from_walletable_id: "",
        from_walletable_type: "bank_account",
        payment_date: "",
        // 領収書ID
        receipt_id: "",
      },
    ]);
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      // TODO: 実際のAPIリクエストを実装
      // const response = await fetch('/api/freee/deals', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(requestData),
      // });

      // if (!response.ok) {
      //   throw new Error('APIリクエストが失敗しました');
      // }

      // const result = await response.json();
      // console.log('API応答:', result);

      // 成功メッセージを表示
      successPopup("freeeへのデータ送信が完了しました");
    } catch (error) {
      console.error("Error submitting data:", error);
      errorPopup("データの送信に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">freee取引登録</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 統合されたレコードテーブル */}
        <div className="rounded-lg bg-white p-6 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">取引レコード</h2>
            <Button label="レコードを追加" onClick={addRecordRow} type="add" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">#</th>
                  {/* 基本情報 */}
                  <th className="border p-2 text-left">発生日</th>
                  <th className="border p-2 text-left">収支区分</th>
                  <th className="border p-2 text-left">事業所ID</th>
                  <th className="border p-2 text-left">支払期日</th>
                  <th className="border p-2 text-left">取引先ID</th>
                  <th className="border p-2 text-left">取引先コード</th>
                  <th className="border p-2 text-left">管理番号</th>
                  {/* 明細情報 */}
                  <th className="border p-2 text-left">税区分コード</th>
                  <th className="border p-2 text-left">勘定科目ID</th>
                  <th className="border p-2 text-left">金額</th>
                  <th className="border p-2 text-left">品目ID</th>
                  <th className="border p-2 text-left">部門ID</th>
                  <th className="border p-2 text-left">メモタグID</th>
                  <th className="border p-2 text-left">備考</th>
                  <th className="border p-2 text-left">消費税額</th>
                  {/* 支払情報 */}
                  <th className="border p-2 text-left">支払金額</th>
                  <th className="border p-2 text-left">口座ID</th>
                  <th className="border p-2 text-left">口座タイプ</th>
                  <th className="border p-2 text-left">支払日</th>
                  {/* 領収書ID */}
                  <th className="border p-2 text-left">領収書ID</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    {/* 基本情報 */}
                    <td className="border p-2">
                      <input
                        id={`issue_date_${index}`}
                        type="date"
                        value={record.issue_date}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "issue_date",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        id={`type_${index}`}
                        value={record.type}
                        onChange={(e) =>
                          handleRecordChange(index, "type", e.target.value)
                        }
                        className="w-full rounded border p-1"
                        required
                      >
                        <option value="income">収入</option>
                        <option value="expense">支出</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        id={`company_id_${index}`}
                        type="number"
                        value={record.company_id}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "company_id",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`due_date_${index}`}
                        type="date"
                        value={record.due_date}
                        onChange={(e) =>
                          handleRecordChange(index, "due_date", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`partner_id_${index}`}
                        type="number"
                        value={record.partner_id}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "partner_id",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`partner_code_${index}`}
                        type="text"
                        value={record.partner_code}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "partner_code",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`ref_number_${index}`}
                        type="text"
                        value={record.ref_number}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "ref_number",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    {/* 明細情報 */}
                    <td className="border p-2">
                      <input
                        id={`tax_code_${index}`}
                        type="number"
                        value={record.tax_code}
                        onChange={(e) =>
                          handleRecordChange(index, "tax_code", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`account_item_id_${index}`}
                        type="number"
                        value={record.account_item_id}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "account_item_id",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`amount_${index}`}
                        type="number"
                        value={record.amount}
                        onChange={(e) =>
                          handleRecordChange(index, "amount", e.target.value)
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`item_id_${index}`}
                        type="number"
                        value={record.item_id}
                        onChange={(e) =>
                          handleRecordChange(index, "item_id", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`section_id_${index}`}
                        type="number"
                        value={record.section_id}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "section_id",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`tag_ids_${index}`}
                        type="number"
                        value={record.tag_ids[0] || ""}
                        onChange={(e) =>
                          handleRecordChange(index, "tag_ids", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`description_${index}`}
                        type="text"
                        value={record.description}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`vat_${index}`}
                        type="number"
                        value={record.vat}
                        onChange={(e) =>
                          handleRecordChange(index, "vat", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    {/* 支払情報 */}
                    <td className="border p-2">
                      <input
                        id={`payment_amount_${index}`}
                        type="number"
                        value={record.payment_amount}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "payment_amount",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`from_walletable_id_${index}`}
                        type="number"
                        value={record.from_walletable_id}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "from_walletable_id",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        id={`from_walletable_type_${index}`}
                        value={record.from_walletable_type}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "from_walletable_type",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      >
                        <option value="bank_account">銀行口座</option>
                        <option value="wallet">現金</option>
                        <option value="credit_card">クレジットカード</option>
                      </select>
                    </td>
                    <td className="border p-2">
                      <input
                        id={`payment_date_${index}`}
                        type="date"
                        value={record.payment_date}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "payment_date",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    {/* 領収書ID */}
                    <td className="border p-2">
                      <input
                        id={`receipt_id_${index}`}
                        type="number"
                        value={record.receipt_id}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "receipt_id",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-center">
          <Button label="freeeに登録する" type="add" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
};
