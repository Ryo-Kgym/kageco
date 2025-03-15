"use client";

import { Loading } from "../../../components/ui/v5/loading/Loading";
import { useDashboardBalance } from "../client/useDashboardBalance";
import type { DashboardFC } from "../types/dashboardFC";
import styles from "./DashboardBalanceClient.module.scss";

export const DashboardBalanceClient: DashboardFC = ({ dashboardSettingId }) => {
  const { loading, data } = useDashboardBalance({
    favoriteFilterId: dashboardSettingId,
  });

  if (loading) return <Loading />;

  return (
    <div className={styles.module}>
      <div className={styles.body}>
        <div className={styles.detail}>
          <span>現金</span>
          <span>{data.cash.toLocaleString()}</span>
        </div>
        <div className={styles.detail}>
          <span>投資</span>
          <span>{data.investment.toLocaleString()}</span>
        </div>
        <div className={styles.detail}>
          <span>合計</span>
          <span>{data.total.toLocaleString()}</span>
        </div>
        <div className={styles.detail}>
          <span>{data.currentDatetime.toLocaleString("ja-JP")}</span>
          <span>現在</span>
        </div>
      </div>
    </div>
  );
};
