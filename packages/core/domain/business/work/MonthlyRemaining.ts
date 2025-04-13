import type { MonthlyAchievement } from "./MonthlyAcheivement";
import type { MonthlyPlan } from "./MonthlyPlan";

export class MonthlyRemaining {
  readonly businessDays: number;
  readonly workSecondsLower: number;

  private constructor(params: {
    businessDays: number;
    workSecondsLower: number;
  }) {
    this.businessDays = params.businessDays;
    this.workSecondsLower = params.workSecondsLower;
  }

  static of(
    plan: MonthlyPlan,
    achievement: MonthlyAchievement,
  ): MonthlyRemaining {
    const businessDays = plan.businessDays - achievement.businessDays;
    const workSecondsLower = plan.workSecondLower - achievement.workedSeconds;

    return new MonthlyRemaining({
      businessDays,
      workSecondsLower,
    });
  }

  calcRecommendedDailyWorkSecond(): number {
    if (this.businessDays <= 0) {
      return this.workSecondsLower;
    }
    return Math.floor(this.workSecondsLower / this.businessDays);
  }
}
