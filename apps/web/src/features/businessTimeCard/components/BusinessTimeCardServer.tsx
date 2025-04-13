import type { YYYY_MM_DD } from "@/type/date/date";

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
  const {
    yearMonth,
    days,
    lastState,
    baseDateLogs,
    totalWorkSecond,
    monthlyPlanned,
    remaining,
  } = await fetchDailyAttendance(baseDate);

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
        plannedBusinessDays={monthlyPlanned.businessDays}
        plannedWorkingSecondLower={monthlyPlanned.workingSecondLower}
        plannedWorkingSecondUpper={monthlyPlanned.workingSecondUpper}
        totalWorkSecond={totalWorkSecond}
        remainingBusinessDays={remaining.businessDays}
        remainingWorkSecondLower={remaining.workingSecondLower}
        recommendedDailyWorkSecond={remaining.recommendedDailyWorkSecond}
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
                    yearMonth,
                    businessDays: monthlyPlanned.businessDays,
                    plannedWorkingHoursLower: monthlyPlanned.workingHoursLower,
                    plannedWorkingHoursUpper: monthlyPlanned.workingHoursUpper,
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
