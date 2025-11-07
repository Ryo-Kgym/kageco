import { useEffect, useState } from "react";

import type { DailyDetail } from "../../../domain/model/household/DailyDetail";
import { getDailyDetail } from "../useServer/getDailyDetail";

export const useStateCutDailyDetail = (params: { id: string }) => {
  const [before, setBefore] = useState<DailyDetail>();
  const [after, setAfter] = useState<DailyDetail>();

  const [cutAfterInit, setCutAfterInit] = useState<Pick<DailyDetail, "amount" | "memo">>({
    amount: 0,
    memo: "",
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    void (async () => {
      const daily = await getDailyDetail(params);
      setBefore(daily);
      setAfter({
        ...daily,
        amount: 0,
        memo: "",
      });
      setCutAfterInit(daily);
    })();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCutAfterInit({
      ...cutAfterInit,
      amount: (before?.amount ?? 0) - (after?.amount ?? 0),
    });
  }, [after?.amount]);

  const loading = !after || !before;

  if (loading)
    return {
      loading,
      form: undefined,
      setForm: setAfter,
      initState: undefined,
      cutAfter: cutAfterInit,
      setCutAfterInit,
    };

  return {
    loading,
    form: after,
    setForm: setAfter,
    initData: before,
    cutAfter: cutAfterInit,
    setCutAfterInit,
  };
};
