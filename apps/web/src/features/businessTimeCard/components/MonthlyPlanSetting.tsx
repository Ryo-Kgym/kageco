"use client";

import type { YYYY_MM } from "@/util/date/date";
import { type FC, useState } from "react";
import { NumberInput } from "../../../components/ui/numberInput/v4/NumberInput";
import { TextInput } from "../../../components/ui/textInput/TextInput";
import styles from "./MonthlyPlanSetting.module.scss";

type Props = {
  initFormState: FormState;
};

type FormState = {
  yearMonth: YYYY_MM;
  businessDays: number;
  plannedWorkingHoursLower: number;
  plannedWorkingHoursUpper: number;
};

export const MonthlyPlanSetting: FC<Props> = ({ initFormState }) => {
  const [form, setForm] = useState<FormState>(initFormState);

  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>年月</th>
          <td>
            <TextInput
              label={""}
              value={form.yearMonth}
              setValue={(value) =>
                setForm({ ...form, yearMonth: value as YYYY_MM })
              }
              disabled
            />
          </td>
        </tr>
        <tr>
          <th>営業日数</th>
          <td>
            <NumberInput
              label={""}
              value={form.businessDays}
              setValue={(value) =>
                setForm((prev) => ({
                  ...prev,
                  businessDays: Number(value),
                }))
              }
              disabled
            />
          </td>
        </tr>
        <tr>
          <th>予定総労働時間（下限）</th>
          <td>
            <NumberInput
              label={""}
              value={form.plannedWorkingHoursLower}
              setValue={(value) =>
                setForm((prev) => ({
                  ...prev,
                  plannedWorkingHoursLower: Number(value),
                }))
              }
              disabled
            />
          </td>
        </tr>
        <tr>
          <th>予定総労働時間（上限）</th>
          <td>
            <NumberInput
              label={""}
              value={form.plannedWorkingHoursUpper}
              setValue={(value) =>
                setForm((prev) => ({
                  ...prev,
                  plannedWorkingHoursUpper: Number(value),
                }))
              }
              disabled
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};
