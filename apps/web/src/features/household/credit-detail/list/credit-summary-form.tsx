import type { FC } from "react";

import { Button } from "../../../../components/ui/button/v5";
import { AccountSelect } from "../../../../components/ui/select/AccountSelect";
import { TextInput } from "../../../../components/ui/textInput/TextInput";
import { DateInput } from "../../../../components/ui/v4/dateInput/DateInput";
import { errorPopup, successPopup } from "../../../../function/successPopup";
import styles from "./credit-summary-form.module.scss";
import { modifyCreditSummaryAction } from "./modify-credit-summary.action";
import type {
  SummaryDisplayState,
  SummaryFormState,
} from "./summary-form-state";
import { useStateCreditSummary } from "./use-state-credit-summary";

type Props = SummaryFormState & SummaryDisplayState;

export const CreditSummaryForm: FC<Props> = (summary) => {
  const { form, setForm } = useStateCreditSummary({ init: summary });

  const updateHandler = async () => {
    try {
      await modifyCreditSummaryAction({
        id: summary.id,
        ...form,
      });

      successPopup("更新しました");
    } catch (e) {
      console.error(e);
      errorPopup("更新に失敗しました");
    }
  };

  return (
    <div>
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>カード</td>
            <td>
              <TextInput
                label={""}
                value={form.creditCard}
                setValue={(v) => setForm({ ...form, creditCard: v })}
              />
            </td>
          </tr>
          <tr>
            <td>引落日</td>
            <td>
              <DateInput
                label={""}
                value={form.withdrawalDate}
                setValue={(v) => {
                  if (!v) return;
                  setForm({ ...form, withdrawalDate: v });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>アカウント</td>
            <td>
              <AccountSelect
                accountId={form.accountId}
                onChange={(v) => {
                  if (!v) return;
                  setForm({ ...form, accountId: v });
                }}
                withLabel
              />
            </td>
          </tr>
          <tr>
            <td>件数</td>
            <td>{summary.count}件</td>
          </tr>
          <tr>
            <td>引落金額</td>
            <td>{summary.totalAmount.toLocaleString()}円</td>
          </tr>
        </tbody>
      </table>
      <div>
        <Button type={"modify"} onClick={updateHandler} label={"更新"} />
      </div>
    </div>
  );
};
