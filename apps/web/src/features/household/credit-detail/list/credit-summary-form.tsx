import type { FC } from "react";

import { Button } from "../../../../components/ui/button/v5";
import { AccountSelect } from "../../../../components/ui/select/AccountSelect";
import { TextInput } from "../../../../components/ui/textInput/TextInput";
import { DateInput } from "../../../../components/ui/v4/dateInput/DateInput";
import { errorPopup, successPopup } from "../../../../function/successPopup";
import { useRouter } from "../../../../routing/client/useRouter";
import { paths } from "../../../../routing/paths";
import { modifyCreditSummaryAction } from "./modify-credit-summary.action";
import type {
  SummaryDisplayState,
  SummaryFormState,
} from "./summary-form-state";
import { useStateCreditSummary } from "./use-state-credit-summary";

type Props = SummaryFormState & SummaryDisplayState;

export const CreditSummaryForm: FC<Props> = (summary) => {
  const { form, setForm } = useStateCreditSummary({ init: summary });
  const { push } = useRouter();
  const backHandler = () => push(paths.household.creditCard);

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
      <table className="m-[10px]">
        <tbody>
          <tr>
            <td className="p-[10px]">カード</td>
            <td>
              <TextInput
                label={""}
                value={form.creditCard}
                setValue={(v) => setForm({ ...form, creditCard: v })}
              />
            </td>
          </tr>
          <tr>
            <td className="p-[10px]">引落日</td>
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
            <td className="p-[10px]">アカウント</td>
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
            <td className="p-[10px]">件数</td>
            <td>{summary.count}件</td>
          </tr>
          <tr>
            <td className="p-[10px]">引落金額</td>
            <td>{summary.totalAmount.toLocaleString()}円</td>
          </tr>
          {summary.error && (
            <tr className={"font-bold text-red-500"}>
              <td className="p-[10px]">エラー</td>
              <td>{summary.error}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <Button type="modify" onClick={updateHandler} label="更新" />
        <Button type={"back"} onClick={backHandler} label={"戻る"} />
      </div>
    </div>
  );
};
