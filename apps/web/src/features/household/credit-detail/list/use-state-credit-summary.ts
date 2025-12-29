import { useState } from "react";
import type { SummaryFormState } from "./summary-form-state";

export const useStateCreditSummary = ({ init }: { init: SummaryFormState }) => {
  const [form, setForm] = useState<SummaryFormState>({
    creditCard: init.creditCard,
    withdrawalDate: init.withdrawalDate,
    accountId: init.accountId,
  });

  return { form, setForm };
};
