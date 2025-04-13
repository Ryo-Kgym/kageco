import type { TZDateTime, YYYY_MM, YYYYmmDD } from "@/type/date/date";

import type { AttendanceState } from "../../../domain/business/attend/AttendanceState";
import { DayAttendance } from "../../../domain/business/attend/DayAttendance";
import { MonthlyAchievement } from "../../../domain/business/work/MonthlyAchievement";
import { MonthlyPlan } from "../../../domain/business/work/MonthlyPlan";
import { MonthlyRemaining } from "../../../domain/business/work/MonthlyRemaining";
import { WorkTime } from "../../../domain/business/work/WorkTime";
import { DayOfWeekFactory } from "../../../domain/date/DayOfWeekFactory";
import type { FindAttendanceGateway } from "../../../gateway/business/work/FindAttendanceGateway";
import type { BusinessUsecase } from "../BusinessUsecase";
import { makeDaysOfMonth } from "./makeDaysOfMonth";

export class CalcWorkTimeUsecase
  implements BusinessUsecase<CalcWorkTimeInput, CalcWorkTimeOutput>
{
  private readonly findAttendanceGateway: FindAttendanceGateway;

  constructor(findAttendanceGateway: FindAttendanceGateway) {
    this.findAttendanceGateway = findAttendanceGateway;
  }

  async handle(input: CalcWorkTimeInput) {
    const monthlyList = makeDaysOfMonth(input.baseDate);

    const { days, monthlyPlan } = await this.findAttendanceGateway.findBy(
      monthlyList[0] ?? input.baseDate,
      monthlyList.slice(-1)[0] ?? input.baseDate,
    );

    const mergedDailyList: DayAttendance[] = monthlyList.map((date) => {
      const matched = days.find((day) => day.date.equals(date));

      if (!matched) {
        return new DayAttendance({
          date,
          dayOfWeek: DayOfWeekFactory.of(date),
          startDatetime: undefined,
          endDatetime: undefined,
          breakSecond: undefined,
          workSecond: undefined,
        });
      }

      return new DayAttendance({
        date,
        dayOfWeek: DayOfWeekFactory.of(date),
        startDatetime: matched.startDatetime,
        endDatetime: matched.endDatetime,
        breakSecond: matched.breakSecond ?? 0,
        workSecond: new WorkTime({
          startDatetime: matched.startDatetime,
          endDatetime: matched.endDatetime,
        }).calcWorkSecond(matched.breakSecond),
      });
    });

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

    const plan = new MonthlyPlan({
      businessDays: monthlyPlan?.businessDays ?? 0,
      workHoursLower: monthlyPlan?.plannedWorkingHoursLower ?? 0,
      workHoursUpper: monthlyPlan?.plannedWorkingHoursUpper ?? 0,
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
  days: DayAttendance[];
  lastState: AttendanceState;
  baseDateLogs: AttendanceLog[];
  totalWorkSecond: number;
  monthlyPlanned: {
    businessDays: number;
    workHoursLower: number;
    workHoursUpper: number;
    workSecondLower: number;
    workSecondUpper: number;
  } | null;
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
