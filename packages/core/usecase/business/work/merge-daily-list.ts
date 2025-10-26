import type { TZDateTime, YYYYmmDD } from "@/util/date/date";

import {
  DailyAttendance,
  ScheduledAttendance,
} from "../../../domain/business/attend/daily-attendance";
import { WorkTime } from "../../../domain/business/work/work-time";
import { DayOfWeekFactory } from "../../../domain/date/DayOfWeekFactory";
import type { DayOfWeek } from "../../../domain/date/dayOfWeek";

/**
 * 日付リストと出勤データから、マージされた日次リストを生成する
 */
export const mergeDailyList = (
  monthlyList: YYYYmmDD[],
  days: {
    id: string;
    date: YYYYmmDD;
    startDatetime: TZDateTime;
    endDatetime: TZDateTime;
    breakSecond: number;
  }[],
): (DailyAttendance | ScheduledAttendance)[] =>
  monthlyList.map((date) => {
    const matched = days.find((day) => day.date.equals(date));

    if (!matched) {
      return new ScheduledAttendance({
        date,
        dayOfWeek: DayOfWeekFactory.of(date),
      });
    }

    return new DailyAttendance({
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
