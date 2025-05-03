"use client";

import type { FC } from "react";
import { useState } from "react";

import { ModalTableSelect } from "../../../components/ui";
import { Button } from "../../../components/ui/button/v5";
import { errorPopup, successPopup } from "../../../function/successPopup";
import { submitFreeeDeals } from "../actions/submit-deals-actions";
import type { UnifiedRecord } from "../types/unified-record";
import styles from "./freee-register-form.module.scss";

type Props = {
  initialRecords?: UnifiedRecord[];
  freeeMasters: {
    taxes: {
      value: string;
      label: string;
    }[];
    accountItems: {
      group: string;
      items: {
        value: string;
        label: string;
      }[];
    }[];
    walletables: {
      value: string;
      label: string;
      type: string;
    }[];
    partners: {
      value: string;
      label: string;
    }[];
  };
};

export const FreeeRegisterForm: FC<Props> = ({
  initialRecords = [],
  freeeMasters,
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
    <div className={styles.container}>
      <h1 className={styles.heading}>freee取引登録</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 統合されたレコードテーブル */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>取引レコード</h2>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  {/* 基本情報 */}
                  <th>発生日 *</th>
                  <th>収支区分</th>
                  <th>取引先ID</th>
                  {/* 明細情報 */}
                  <th>税区分コード</th>
                  <th>勘定科目ID</th>
                  <th>金額 *</th>
                  <th>メモタグID</th>
                  <th>備考</th>
                  {/* 支払情報 */}
                  <th>支払金額 *</th>
                  <th>口座ID *</th>
                  <th>支払日 *</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>{index + 1}</td>
                    {/* 基本情報 */}
                    <td className={styles.tableCell}>
                      <input
                        id={`issueDate_${index}`}
                        type="date"
                        value={record.issueDate}
                        onChange={(e) =>
                          handleRecordChange(index, "issueDate", e.target.value)
                        }
                        className={styles.input}
                        required
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.cellContent}>
                        {record.type === "income" ? "収入" : "支出"}
                      </div>
                    </td>
                    <td className={styles.selectCell}>
                      <ModalTableSelect
                        data={freeeMasters.partners}
                        label={""}
                        value={records[index]?.partnerId ?? ""}
                        onChange={(v) =>
                          handleRecordChange(index, "partnerId", v)
                        }
                        maxDropdownHeight={600}
                        gridColumns={4}
                        size={"xl"}
                      />
                    </td>
                    {/* 明細情報 */}
                    <td className={styles.selectCell}>
                      <ModalTableSelect
                        data={freeeMasters.taxes}
                        label={""}
                        value={records[index]?.taxCode ?? ""}
                        onChange={(v) =>
                          handleRecordChange(index, "taxCode", v)
                        }
                        maxDropdownHeight={600}
                        gridColumns={4}
                        size={"xl"}
                      />
                    </td>
                    <td className={styles.selectCell}>
                      <ModalTableSelect
                        data={freeeMasters.accountItems}
                        label={""}
                        value={records[index]?.accountItemId ?? ""}
                        onChange={(v) =>
                          handleRecordChange(index, "accountItemId", v)
                        }
                        maxDropdownHeight={600}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <input
                        id={`amount_${index}`}
                        type="number"
                        value={record.amount}
                        onChange={(e) =>
                          handleRecordChange(index, "amount", e.target.value)
                        }
                        className={styles.input}
                        required
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <input
                        id={`tagIds_${index}`}
                        type="text"
                        value={record.tagIds[0] || ""}
                        onChange={(e) =>
                          handleRecordChange(index, "tagIds", e.target.value)
                        }
                        className={styles.input}
                      />
                    </td>
                    <td className={styles.tableCell}>
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
                        className={styles.input}
                      />
                    </td>
                    {/* 支払情報 */}
                    <td className={styles.tableCell}>
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
                        className={styles.input}
                        required
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <ModalTableSelect
                        data={freeeMasters.walletables}
                        label={""}
                        value={records[index]?.fromWalletableId ?? ""}
                        onChange={(v) =>
                          handleRecordChange(index, "fromWalletableId", v)
                        }
                        maxDropdownHeight={400}
                        gridColumns={1}
                      />
                    </td>
                    <td className={styles.tableCell}>
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
                        className={styles.input}
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <Button
            type="save"
            label={"freeeに登録する"}
            // @ts-expect-error
            onClick={handleSubmit}
          />
        </div>
      </form>
    </div>
  );
};
