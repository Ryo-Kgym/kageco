import { useEffect, useState } from "react";

import type { LoadingData } from "../../../global/type/loadingData";
import { fetchDashboardMonthly } from "../server/fetchDashboardMonthly";
import type { DashboardComponentProps } from "../types/dashboardFC";

type DataType = Awaited<ReturnType<typeof fetchDashboardMonthly>>;

export const useDashboardMonthly = (params: DashboardComponentProps): LoadingData<DataType> => {
  const [data, setData] = useState<DataType>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    void (async () => {
      setData(await fetchDashboardMonthly(params));
    })();
  }, []);

  if (!data) {
    return {
      loading: true,
      data: undefined,
    };
  }

  return {
    loading: false,
    data,
  };
};
