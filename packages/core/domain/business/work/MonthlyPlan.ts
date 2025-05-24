export class MonthlyPlan {
  readonly businessDays: number;
  readonly workHoursLower: number;
  readonly workHoursUpper: number;

  constructor(params: {
    businessDays: number;
    workHoursLower: number;
    workHoursUpper: number;
  }) {
    this.businessDays = params.businessDays;
    this.workHoursLower = params.workHoursLower;
    this.workHoursUpper = params.workHoursUpper;
  }

  get workSecondLower() {
    return this.workHoursLower * 60 * 60;
  }

  get workSecondUpper() {
    return this.workHoursUpper * 60 * 60;
  }

  static of(occupancyRate: number) {
    const businessDays = 20;
    const basicWorkHours = 8 * businessDays * occupancyRate;
    const buffer = businessDays * occupancyRate;

    return new MonthlyPlan({
      businessDays,
      workHoursLower: basicWorkHours - buffer,
      workHoursUpper: basicWorkHours + buffer,
    });
  }
}
