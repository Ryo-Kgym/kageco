import type { FC } from "react";

import { convertToHms } from "@/util/date/convertToHms";
import type { AttendanceLog } from "../types/type";
import styles from "./AttendanceLogTable.module.scss";

type Props = {
  logs: AttendanceLog[];
};

export const AttendanceLogTable: FC<Props> = ({ logs }) => {
  return (
    <div className={styles.module}>
      <table>
        <thead>
          <tr className={styles.tr}>
            <th>時刻</th>
            <th>イベント</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <LogRow key={log.id} {...log} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const LogRow = (log: AttendanceLog) => {
  return (
    <tr className={styles.tr}>
      <td align={"center"}>{convertToHms(log.datetime.parseDate())}</td>
      <td align={"center"}>{log.state === "attend" ? "出勤" : "退勤"}</td>
    </tr>
  );
};
