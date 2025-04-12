import type { FC } from "react";

import { convertSecondToHour } from "../../../function/date/convertSecond";
import styles from "./MonthlySummary.module.scss";

type Props = {
  businessDays: number;
  planWorkSecondLower: number;
  planWorkSecondUpper: number;
  totalWorkSecond: number;
  remainingWorkSecondLower: number;
  recommendedDailyWorkSecond: number;
};

export const MonthlySummary: FC<Props> = ({
  businessDays,
  planWorkSecondLower,
  planWorkSecondUpper,
  totalWorkSecond,
  remainingWorkSecondLower,
  recommendedDailyWorkSecond,
}) => {
  return (
    <table className={styles.table}>
      <tbody>
        <tr>
          <th>営業日数</th>
          <td>{businessDays}</td>
        </tr>
        <tr>
          <th>予定総労働時間（下限）</th>
          <td>{convertSecondToHour(planWorkSecondLower).hhmm}</td>
        </tr>
        <tr>
          <th>予定総労働時間（上限）</th>
          <td>{convertSecondToHour(planWorkSecondUpper).hhmm}</td>
        </tr>
        <tr>
          <th>実績総労働時間</th>
          <td>{convertSecondToHour(totalWorkSecond).hhmm}</td>
        </tr>
        <tr>
          <th>下限までの残り労働時間</th>
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
