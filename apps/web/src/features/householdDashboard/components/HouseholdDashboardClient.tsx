import type { FC } from "react";

import type { DashboardComponentProps } from "../types/dashboardFC";
import type { DashboardFeature } from "../types/dashboardFeature";
import { DashboardBalanceClient } from "./DashboardBalanceClient";
import { DashboardMonthlyClient } from "./DashboardMonthlyClient";
import styles from "./HouseholdDashboardClient.module.scss";
import { ItemCard } from "./ItemCard";

type Props = {
  items: ({
    feature: DashboardFeature;
  } & DashboardComponentProps)[];
};

export const HouseholdDashboardClient: FC<Props> = ({ items }) => {
  return (
    <div className={styles.module}>
      {items.map((item) => (
        <ItemCard key={item.dashboardSettingId} itemName={buildItemName(item)}>
          {item.feature === "balance" && <DashboardBalanceClient {...item} />}
          {item.feature === "monthly" && <DashboardMonthlyClient {...item} />}
        </ItemCard>
      ))}
    </div>
  );
};

const buildItemName = (params: Props["items"][number]) => {
  switch (params.feature) {
    case "monthly": {
      const month =
        Number(params.dashboardSettingArgs.find((arg) => arg.type === "month")?.value) ?? 0;
      const targetDate = new Date();
      targetDate.setMonth(targetDate.getMonth() + month);

      return `${targetDate.getFullYear()}年${targetDate.getMonth() + 1}月の実績`;
    }
    default:
      return params.feature;
  }
};
