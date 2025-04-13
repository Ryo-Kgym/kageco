import type { YYYY_MM, YYYY_MM_DD } from "@/type/date/date";

import { Tabs } from "../../../components/ui/v4/tab";
import { fetchDailyAttendance } from "../server/fetchDailyAttendance";
import { AttendOrLeaveButton } from "./AttendOrLeaveButton";
import { AttendanceLogTable } from "./AttendanceLogTable";
import { DailyAttendanceTable } from "./DailyAttendanceTable";
import { DateNavigator } from "./DateNavigator";
import { MonthlyPlanSetting } from "./MonthlyPlanSetting";
import { MonthlySummary } from "./MonthlySummary";

export const BusinessTimeCardServer = async ({
  baseDate,
}: {
  baseDate: YYYY_MM_DD;
}) => {
  const { days, lastState, baseDateLogs, totalWorkSecond } =
    await fetchDailyAttendance(baseDate);

  const mocks = {
    businessDays: 20,
    plannedWorkingSecondLower: 140 * 60 * 60,
    plannedWorkingSecondUpper: 180 * 60 * 60,
    plannedWorkingHoursLower: 140,
    plannedWorkingHoursUpper: 180,
    totalWorkSecond: 140 * 60 * 60,
    remainingBusinessDays: 10,
    remainingWorkSecondLower: 20 * 60 * 60,
    recommendedDailyWorkSecond: 8 * 60 * 60,
    yearMonth: baseDate.slice(0, 7) as YYYY_MM,
  };

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
      <MonthlySummary
        plannedBusinessDays={mocks.businessDays}
        plannedWorkingSecondLower={mocks.plannedWorkingSecondLower}
        plannedWorkingSecondUpper={mocks.plannedWorkingSecondUpper}
        totalWorkSecond={totalWorkSecond}
        remainingBusinessDays={mocks.remainingBusinessDays}
        remainingWorkSecondLower={mocks.remainingWorkSecondLower}
        recommendedDailyWorkSecond={mocks.recommendedDailyWorkSecond}
      />
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
            plan: {
              label: "予定",
              Component: (
                <MonthlyPlanSetting
                  initFormState={{
                    yearMonth: mocks.yearMonth,
                    businessDays: mocks.businessDays,
                    plannedWorkingHoursLower: mocks.plannedWorkingHoursLower,
                    plannedWorkingHoursUpper: mocks.plannedWorkingHoursUpper,
                  }}
                />
              ),
            },
          }}
          defaultTab={"daily"}
        />
      </div>
    </div>
  );
};
