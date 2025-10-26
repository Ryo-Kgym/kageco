import type {
  DailyAttendance,
  ScheduledAttendance,
} from "../attend/daily-attendance";

export class MonthlyAchievement {
  readonly businessDays: number;
  readonly workedSeconds: number;

  private constructor(params: {
    businessDays: number;
    workedSeconds: number;
  }) {
    this.businessDays = params.businessDays;
    this.workedSeconds = params.workedSeconds;
  }

  static of(
    days: (DailyAttendance | ScheduledAttendance)[],
  ): MonthlyAchievement {
    const businessDays = days.filter(
      (day) => day.workSecond !== undefined,
    ).length;
    const workedSeconds = days
      .map((day) => day.workSecond ?? 0)
      .reduce((acc, cur) => acc + cur, 0);

    return new MonthlyAchievement({
      businessDays,
      workedSeconds,
    });
  }
}
