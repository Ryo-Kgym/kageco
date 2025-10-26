import type { TZDateTime, YYYY_MM, YYYYmmDD } from "@/util/date/date";

import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import type { DailyAttendance } from "../../../domain/business/attend/daily-attendance";
import { MonthlyAchievement } from "../../../domain/business/work/MonthlyAchievement";
import { MonthlyRemaining } from "../../../domain/business/work/MonthlyRemaining";
import type { CreateMonthlyPlanGateway } from "../../../gateway/business/work/create-monthly-plan.gateway";
import type { FindAttendanceGateway } from "../../../gateway/business/work/find-attendance.gateway";
import type { BusinessUsecase } from "../BusinessUsecase";
import { CreateMonthlyPlanUsecase } from "./create-monthly-plan.usecase";
import { makeDaysOfMonth } from "./makeDaysOfMonth";
import { mergeDailyList } from "./merge-daily-list";

export class CalcWorkTimeUsecase
  implements BusinessUsecase<CalcWorkTimeInput, CalcWorkTimeOutput>
{
  constructor(
    private findAttendanceGateway: FindAttendanceGateway,
    private createMonthlyPlanGateway: CreateMonthlyPlanGateway,
  ) {}

  async handle(input: CalcWorkTimeInput) {
    const monthlyList = makeDaysOfMonth(input.baseDate);

    const { days, monthlyPlan } = await this.findAttendanceGateway.findBy(
      monthlyList[0] ?? input.baseDate,
      monthlyList.slice(-1)[0] ?? input.baseDate,
    );

    const mergedDailyList = mergeDailyList(monthlyList, days);

    const baseDateLogs: AttendanceLog[] =
      days
        .find((day) => day.date.equals(input.baseDate))
        ?.logs?.map((log) => ({
          id: log.id,
          state: log.state as AttendanceState,
          datetime: log.datetime,
        })) ?? [];
    const baseDateLastLog = baseDateLogs.slice(-1)[0];
    const lastState = (baseDateLastLog?.state ?? "leave") as AttendanceState;

    const totalWorkSecond = mergedDailyList.reduce(
      (acc, day) => acc + (day.workSecond ?? 0),
      0,
    );

    const createMonthlyPlanUsecase = new CreateMonthlyPlanUsecase(
      this.createMonthlyPlanGateway,
    );
    const plan = await createMonthlyPlanUsecase.handle({
      monthlyPlan,
    });

    const achievement = MonthlyAchievement.of(mergedDailyList);
    const remaining = MonthlyRemaining.of(plan, achievement);

    return {
      yearMonth: input.baseDate.yyyy_mm,
      days: mergedDailyList,
      lastState,
      baseDateLogs,
      totalWorkSecond,
      monthlyPlanned: {
        businessDays: plan.businessDays,
        workHoursLower: plan.workHoursLower,
        workHoursUpper: plan.workHoursUpper,
        workSecondLower: plan.workSecondLower,
        workSecondUpper: plan.workSecondUpper,
      },
      remaining: {
        businessDays: remaining.businessDays,
        workSecondLower: remaining.workSecondsLower,
        recommendedDailyWorkSecond: remaining.calcRecommendedDailyWorkSecond(),
      },
    };
  }
}

type CalcWorkTimeInput = {
  baseDate: YYYYmmDD;
};

type CalcWorkTimeOutput = {
  yearMonth: YYYY_MM;
  days: DailyAttendance[];
  lastState: AttendanceState;
  baseDateLogs: AttendanceLog[];
  totalWorkSecond: number;
  monthlyPlanned: {
    businessDays: number;
    workHoursLower: number;
    workHoursUpper: number;
    workSecondLower: number;
    workSecondUpper: number;
  };
  remaining: {
    businessDays: number;
    workSecondLower: number;
    recommendedDailyWorkSecond: number;
  };
};

type AttendanceLog = {
  id: string;
  state: AttendanceState;
  datetime: TZDateTime;
};
