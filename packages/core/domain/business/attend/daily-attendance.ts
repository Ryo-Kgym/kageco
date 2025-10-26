import type { TZDateTime, YYYYmmDD } from "@/util/date/date";

import type { DayOfWeek } from "../../date/dayOfWeek";

export class DailyAttendance {
  readonly date: YYYYmmDD;
  readonly dayOfWeek: DayOfWeek;
  readonly startDatetime: TZDateTime | undefined;
  readonly endDatetime: TZDateTime | undefined;
  readonly breakSecond: number | undefined;
  readonly workSecond: number | undefined;

  constructor(params: {
    date: YYYYmmDD;
    dayOfWeek: DayOfWeek;
    startDatetime: TZDateTime | undefined;
    endDatetime: TZDateTime | undefined;
    breakSecond: number | undefined;
    workSecond: number | undefined;
  }) {
    this.date = params.date;
    this.dayOfWeek = params.dayOfWeek;
    this.startDatetime = params.startDatetime;
    this.endDatetime = params.endDatetime;
    this.breakSecond = params.breakSecond;
    this.workSecond = params.workSecond;
  }
}
