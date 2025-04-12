import type { YYYY_MM_DD } from "@/type/date/date";

import { Tabs } from "../../../components/ui/v4/tab";
import { fetchDailyAttendance } from "../server/fetchDailyAttendance";
import { AttendOrLeaveButton } from "./AttendOrLeaveButton";
import { AttendanceLogTable } from "./AttendanceLogTable";
import { DailyAttendanceTable } from "./DailyAttendanceTable";
import { DateNavigator } from "./DateNavigator";
import { MonthlySummary } from "./MonthlySummary";

export const BusinessTimeCardServer = async ({
  baseDate,
}: {
  baseDate: YYYY_MM_DD;
}) => {
  const { days, lastState, baseDateLogs, totalWorkSecond } =
    await fetchDailyAttendance(baseDate);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <DateNavigator baseDate={baseDate} />
      <AttendOrLeaveButton lastState={lastState} />
      <MonthlySummary totalWorkSecond={totalWorkSecond} />
      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "start",
        }}
      >
        <Tabs
          tabs={{
            daily: {
              label: "日毎",
              Component: <DailyAttendanceTable days={days} />,
            },
            log: {
              label: "履歴",
              Component: <AttendanceLogTable logs={baseDateLogs} />,
            },
          }}
          defaultTab={"daily"}
        />
      </div>
    </div>
  );
};
