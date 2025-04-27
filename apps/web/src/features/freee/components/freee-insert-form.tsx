"use client";

import type { FC } from "react";
import { useState } from "react";

import { Button } from "../../../components/ui/button/v5";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { submitFreeeDeals } from "../actions/freee-submit-actions";
import type { UnifiedRecord } from "../types/unified-record";

/**
 * freeeへ取引登録するフォームコンポーネント
 */
export const FreeeInsertForm: FC<{ initialRecords?: UnifiedRecord[] }> = ({
  initialRecords = [],
}) => {
  // 統合されたレコードのフォームデータ
  const [records, setRecords] = useState<UnifiedRecord[]>(initialRecords);

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

  // メッセージ定義
  const successMessage = "freeeへのデータ送信が完了しました";
  const errorMessage = "データの送信に失敗しました。もう一度お試しください。";

  // フォーム送信ハンドラ
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // サーバーアクションを呼び出してデータを送信
      const result = await submitFreeeDeals(records);

      if (result.success) {
        successPopup(successMessage);
      } else {
        errorPopup(result.error?.message || errorMessage);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      errorPopup(errorMessage);
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">#</th>
                  {/* 基本情報 */}
                  <th className="border p-2 text-left">発生日 *</th>
                  <th className="border p-2 text-left">収支区分</th>
                  <th className="border p-2 text-left">支払期日</th>
                  <th className="border p-2 text-left">取引先ID</th>
                  <th className="border p-2 text-left">取引先コード</th>
                  {/* 明細情報 */}
                  <th className="border p-2 text-left">税区分コード</th>
                  <th className="border p-2 text-left">勘定科目ID</th>
                  <th className="border p-2 text-left">金額 *</th>
                  <th className="border p-2 text-left">品目ID</th>
                  <th className="border p-2 text-left">部門ID</th>
                  <th className="border p-2 text-left">メモタグID</th>
                  <th className="border p-2 text-left">備考</th>
                  <th className="border p-2 text-left">消費税額</th>
                  {/* 支払情報 */}
                  <th className="border p-2 text-left">支払金額 *</th>
                  <th className="border p-2 text-left">口座ID *</th>
                  <th className="border p-2 text-left">口座タイプ *</th>
                  <th className="border p-2 text-left">支払日 *</th>
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
                      <div className="w-full p-1">
                        {record.type === "income" ? "収入" : "支出"}
                      </div>
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
