import type { TZDateTime, YYYYmmDD } from "@/util/date/date";

import { DayAttendance } from "../../../domain/business/attend/DayAttendance";
import { WorkTime } from "../../../domain/business/work/WorkTime";
import { DayOfWeekFactory } from "../../../domain/date/DayOfWeekFactory";

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
): DayAttendance[] =>
  monthlyList.map((date) => {
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
