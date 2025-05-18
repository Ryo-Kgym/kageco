import type { YYYYmmDD } from "@/util/date/date";

import type { DayOfWeek } from "./dayOfWeek";

export class DayOfWeekFactory {
  private readonly date: Date;
  private readonly map: Record<number, DayOfWeek> = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wed",
    4: "thu",
    5: "fri",
    6: "sat",
  };

  constructor(date: Date) {
    this.date = date;
  }

  static of(yyyyMMdd: YYYYmmDD): DayOfWeek {
    return new DayOfWeekFactory(yyyyMMdd.parseDate()).convert();
  }

  private convert(): DayOfWeek {
    return this.map[this.date.getDay() & 7] as DayOfWeek;
  }
}
