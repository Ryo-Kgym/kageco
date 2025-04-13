import type { TZDateTime, YYYY_MM, YYYYmmDD } from "@/type/date/date";

import type { AttendanceState } from "../../../domain/business/attend/AttendanceState";
import { MonthlyPlan } from "../../../domain/business/work/MonthlyPlan";
import { WorkTime } from "../../../domain/business/work/WorkTime";
import { DayOfWeekFactory } from "../../../domain/date/DayOfWeekFactory";
import type { DayOfWeek } from "../../../domain/date/dayOfWeek";
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
        return {
          date,
          dayOfWeek: DayOfWeekFactory.of(date),
          startDatetime: undefined,
          endDatetime: undefined,
          breakSecond: undefined,
          workSecond: undefined,
        };
      }

      return {
        date,
        dayOfWeek: DayOfWeekFactory.of(date),
        startDatetime: matched.startDatetime,
        endDatetime: matched.endDatetime,
        breakSecond: matched.breakSecond ?? 0,
        workSecond: new WorkTime({
          startDatetime: matched.startDatetime,
          endDatetime: matched.endDatetime,
        }).calcWorkSecond(matched.breakSecond),
      };
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

    const monthlyPlanObj = new MonthlyPlan({
      businessDays: monthlyPlan?.businessDays ?? 0,
      workingHoursLower: monthlyPlan?.plannedWorkingHoursLower ?? 0,
      workingHoursUpper: monthlyPlan?.plannedWorkingHoursUpper ?? 0,
    });

    return {
      yearMonth: input.baseDate.yyyy_mm,
      days: mergedDailyList,
      lastState,
      baseDateLogs,
      totalWorkSecond,
      monthlyPlanned: {
        businessDays: monthlyPlanObj.businessDays,
        workingHoursLower: monthlyPlanObj.workingHoursLower,
        workingHoursUpper: monthlyPlanObj.workingHoursUpper,
        workingSecondLower: monthlyPlanObj.workingSecondLower,
        workingSecondUpper: monthlyPlanObj.workingSecondUpper,
      },
      remaining: {
        businessDays: 10,
        workingSecondLower: 20 * 60 * 60,
        recommendedDailyWorkSecond: 8 * 60 * 60,
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
    workingHoursLower: number;
    workingHoursUpper: number;
    workingSecondLower: number;
    workingSecondUpper: number;
  } | null;
  remaining: {
    businessDays: number;
    workingSecondLower: number;
    recommendedDailyWorkSecond: number;
  };
};

type DayAttendance = {
  date: YYYYmmDD;
  dayOfWeek: DayOfWeek;
  startDatetime: TZDateTime | undefined;
  endDatetime: TZDateTime | undefined;
  breakSecond: number | undefined;
  workSecond: number | undefined;
};

type AttendanceLog = {
  id: string;
  state: AttendanceState;
  datetime: TZDateTime;
};
