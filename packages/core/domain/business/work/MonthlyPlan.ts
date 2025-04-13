export class MonthlyPlan {
  readonly businessDays: number;
  readonly workingHoursLower: number;
  readonly workingHoursUpper: number;

  constructor(params: {
    businessDays: number;
    workingHoursLower: number;
    workingHoursUpper: number;
  }) {
    this.businessDays = params.businessDays;
    this.workingHoursLower = params.workingHoursLower;
    this.workingHoursUpper = params.workingHoursUpper;
  }

  get workingSecondLower() {
    return this.workingHoursLower * 60 * 60;
  }

  get workingSecondUpper() {
    return this.workingHoursUpper * 60 * 60;
  }
}
