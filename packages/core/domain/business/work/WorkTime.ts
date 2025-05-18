import type { TZDateTime } from "@/util/date/date";

export class WorkTime {
  private readonly startDatetime: TZDateTime;
  private readonly endDatetime: TZDateTime;

  constructor({
    startDatetime,
    endDatetime,
  }: {
    startDatetime: TZDateTime;
    endDatetime: TZDateTime;
  }) {
    this.startDatetime = startDatetime;
    this.endDatetime = endDatetime;
  }

  calcWorkSecond(breakSecond: number) {
    const workPeriodSecondForDay =
      Math.floor(this.endDatetime.getTime() - this.startDatetime.getTime()) /
      1000;

    return workPeriodSecondForDay - breakSecond;
  }
}
