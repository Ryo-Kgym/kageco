"use client";

import type { FC } from "react";
import { useState } from "react";

import { Button } from "../../../components/ui/button/v5";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { submitFreeeDeals } from "../actions/submit-deals-actions";
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
    if (field === "tagIds") {
      // tagIdsは配列なので特別に処理
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
                        id={`issueDate_${index}`}
                        type="date"
                        value={record.issueDate}
                        onChange={(e) =>
                          handleRecordChange(index, "issueDate", e.target.value)
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
                        id={`dueDate_${index}`}
                        type="date"
                        value={record.dueDate}
                        onChange={(e) =>
                          handleRecordChange(index, "dueDate", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`partnerId_${index}`}
                        type="number"
                        value={record.partnerId}
                        onChange={(e) =>
                          handleRecordChange(index, "partnerId", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`partnerCode_${index}`}
                        type="text"
                        value={record.partnerCode}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "partnerCode",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    {/* 明細情報 */}
                    <td className="border p-2">
                      <input
                        id={`taxCode_${index}`}
                        type="number"
                        value={record.taxCode}
                        onChange={(e) =>
                          handleRecordChange(index, "taxCode", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`accountItemId_${index}`}
                        type="number"
                        value={record.accountItemId}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "accountItemId",
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
                        id={`itemId_${index}`}
                        type="number"
                        value={record.itemId}
                        onChange={(e) =>
                          handleRecordChange(index, "itemId", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`sectionId_${index}`}
                        type="number"
                        value={record.sectionId}
                        onChange={(e) =>
                          handleRecordChange(index, "sectionId", e.target.value)
                        }
                        className="w-full rounded border p-1"
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`tagIds_${index}`}
                        type="number"
                        value={record.tagIds[0] || ""}
                        onChange={(e) =>
                          handleRecordChange(index, "tagIds", e.target.value)
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
                        id={`paymentAmount_${index}`}
                        type="number"
                        value={record.paymentAmount}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "paymentAmount",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <input
                        id={`fromWalletableId_${index}`}
                        type="number"
                        value={record.fromWalletableId}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "fromWalletableId",
                            e.target.value,
                          )
                        }
                        className="w-full rounded border p-1"
                        required
                      />
                    </td>
                    <td className="border p-2">
                      <select
                        id={`fromWalletableType_${index}`}
                        value={record.fromWalletableType}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "fromWalletableType",
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
                        id={`paymentDate_${index}`}
                        type="date"
                        value={record.paymentDate}
                        onChange={(e) =>
                          handleRecordChange(
                            index,
                            "paymentDate",
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
