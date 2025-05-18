import type { FC } from "react";

import { convertSecondToHour } from "@/util/date/convertSecond";
import styles from "./MonthlySummary.module.scss";

type Props = {
  plannedBusinessDays: number;
  plannedWorkingSecondLower: number;
  plannedWorkingSecondUpper: number;
  totalWorkSecond: number;
  remainingBusinessDays: number;
  remainingWorkSecondLower: number;
  recommendedDailyWorkSecond: number;
};

export const MonthlySummary: FC<Props> = ({
  plannedBusinessDays,

  plannedWorkingSecondLower,
  plannedWorkingSecondUpper,
  totalWorkSecond,
  remainingBusinessDays,
  remainingWorkSecondLower,
  recommendedDailyWorkSecond,
}) => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>予定営業日数</th>
          <td>{plannedBusinessDays}</td>
        </tr>
        <tr>
          <th>予定総労働時間（下限）</th>
          <td>{convertSecondToHour(plannedWorkingSecondLower).hhmm}</td>
        </tr>
        <tr>
          <th>予定総労働時間（上限）</th>
          <td>{convertSecondToHour(plannedWorkingSecondUpper).hhmm}</td>
        </tr>
        <tr>
          <th>実績総労働時間</th>
          <td>{convertSecondToHour(totalWorkSecond).hhmm}</td>
        </tr>
        <tr>
          <th>残りの営業日数</th>
          <td>{remainingBusinessDays}</td>
        </tr>
        <tr>
          <th>下限までの残り 労働時間</th>
          <td>{convertSecondToHour(remainingWorkSecondLower).hhmm}</td>
        </tr>
        <tr>
          <th>残りの1日あたりの労働時間</th>
          <td>{convertSecondToHour(recommendedDailyWorkSecond).hhmm}</td>
        </tr>
      </tbody>
    </table>
  );
};
