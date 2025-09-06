import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import type { DailyDetailForm } from "./dailyDetailForm";
import { initialDailyDetailForm } from "./dailyDetailForm";

export const useStateDailyForm = (params: { date: Date }) => {
  const [form, setForm] = useState<DailyDetailForm>({
    ...initialDailyDetailForm,
    date: params.date,
  });

  const searchParams = useSearchParams();

  const resetForm = () => {
    setForm({ ...initialDailyDetailForm, date: params.date });
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: searchParams is stable; intentionally omitting 'form' and 'params.date' to avoid unnecessary reruns.
  useEffect(() => {
    const accountId = searchParams.get("accountId");
    if (accountId) {
      setForm(prevForm => ({
        ...prevForm,
        accountId: accountId ?? "",
      }));
    }
  }, [searchParams]);

  return { form, setForm, resetForm };
};
