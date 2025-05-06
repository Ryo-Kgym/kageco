import type { FC, FormEvent } from "react";

import { ModalTableSelect } from "../../../components/ui";
import { Button } from "../../../components/ui/button/v5";
import { LinkFreeeComponent } from "../../freeeAuth/components/link-freee-component";
import { useStateFreeeMaster } from "../hooks/use-state-freee-master";
import { useStateFreeeRecord } from "../hooks/use-state-freee-record";
import { useStateDailyDetail } from "../hooks/useStateDailyDetail";
import styles from "./link-freee-detail.module.scss";

type Props = {
  id: string;
  onClose: () => void;
};

export const LinkFreeeDetail: FC<Props> = ({ id, onClose }) => {
  const { form, loading } = useStateDailyDetail({ id });
  const { freeeMasters, loadingMasters } = useStateFreeeMaster();
  const {
    record,
    handleRecordChange,
    handleSubmit: handleSubmitFieldOnly,
  } = useStateFreeeRecord({
    form,
    onClose,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const fromWalletableType = freeeMasters?.walletables.find(
      (w) => w.value === record?.fromWalletableId,
    )?.type;

    if (!fromWalletableType) {
      return;
    }

    return handleSubmitFieldOnly(fromWalletableType, e);
  };

  if (loading || loadingMasters) {
    return <div>Loading...</div>;
  }

  return (
    <LinkFreeeComponent>
      {record && freeeMasters && (
        <div className={styles.container}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.card}>
              {/* 基本情報 */}
              <div className={styles.formField}>
                <label
                  htmlFor="issueDate"
                  className={`${styles.formLabel} ${styles.required}`}
                >
                  発生日
                </label>
                <input
                  id="issueDate"
                  type="date"
                  value={record.issueDate}
                  onChange={(e) =>
                    handleRecordChange("issueDate", e.target.value)
                  }
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formField}>
                <span id="typeLabel" className={styles.formLabel}>
                  収支区分
                </span>
                <div className={styles.formValue} aria-labelledby="typeLabel">
                  {record.type === "income" ? "収入" : "支出"}
                </div>
              </div>

              <div className={styles.formField}>
                <label htmlFor="partnerId" className={styles.formLabel}>
                  取引先ID
                </label>
                <ModalTableSelect
                  data={freeeMasters.partners}
                  label={""}
                  value={record.partnerId}
                  onChange={(v) => handleRecordChange("partnerId", v)}
                  maxDropdownHeight={600}
                  gridColumns={4}
                />
              </div>

              {/* 明細情報 */}
              <div className={styles.formField}>
                <label htmlFor="taxCode" className={styles.formLabel}>
                  税区分コード
                </label>
                <ModalTableSelect
                  data={freeeMasters.taxes}
                  label={""}
                  value={record.taxCode}
                  onChange={(v) => handleRecordChange("taxCode", v)}
                  maxDropdownHeight={600}
                  gridColumns={4}
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="accountItemId" className={styles.formLabel}>
                  勘定科目ID
                </label>
                <ModalTableSelect
                  data={freeeMasters.accountItems}
                  label={""}
                  value={record.accountItemId}
                  onChange={(v) => handleRecordChange("accountItemId", v)}
                  maxDropdownHeight={600}
                />
              </div>

              <div className={styles.formField}>
                <label
                  htmlFor="amount"
                  className={`${styles.formLabel} ${styles.required}`}
                >
                  金額
                </label>
                <input
                  id="amount"
                  type="number"
                  value={record.amount}
                  onChange={(e) => handleRecordChange("amount", e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="tagIds" className={styles.formLabel}>
                  メモタグID
                </label>
                <input
                  id="tagIds"
                  type="text"
                  value={record.tagIds[0] || ""}
                  onChange={(e) => handleRecordChange("tagIds", e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="description" className={styles.formLabel}>
                  備考
                </label>
                <input
                  id="description"
                  type="text"
                  value={record.description}
                  onChange={(e) =>
                    handleRecordChange("description", e.target.value)
                  }
                  className={styles.input}
                />
              </div>

              {/* 支払情報 */}
              <div className={styles.formField}>
                <label
                  htmlFor="paymentAmount"
                  className={`${styles.formLabel} ${styles.required}`}
                >
                  支払金額
                </label>
                <input
                  id="paymentAmount"
                  type="number"
                  value={record.paymentAmount}
                  onChange={(e) =>
                    handleRecordChange("paymentAmount", e.target.value)
                  }
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formField}>
                <label
                  htmlFor="fromWalletableId"
                  className={`${styles.formLabel} ${styles.required}`}
                >
                  口座ID
                </label>
                <ModalTableSelect
                  data={freeeMasters.walletables}
                  label={""}
                  value={record.fromWalletableId}
                  onChange={(v) => handleRecordChange("fromWalletableId", v)}
                  maxDropdownHeight={400}
                  gridColumns={1}
                />
              </div>

              <div className={styles.formField}>
                <label
                  htmlFor="paymentDate"
                  className={`${styles.formLabel} ${styles.required}`}
                >
                  支払日
                </label>
                <input
                  id="paymentDate"
                  type="date"
                  value={record.paymentDate}
                  onChange={(e) =>
                    handleRecordChange("paymentDate", e.target.value)
                  }
                  className={styles.input}
                  required
                />
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
      )}
    </LinkFreeeComponent>
  );
};
