import type { TZDateTime, YYYYmmDD } from "@/util/date/date";

import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import { DayOfWeekFactory } from "../../date/DayOfWeekFactory";
import type { DayOfWeek } from "../../date/dayOfWeek";
import { WorkTime } from "../work/work-time";

interface DailyLog {
  id: string;
  state: AttendanceState;
  datetime: TZDateTime;
}

export class DailyAttendance {
  readonly date: YYYYmmDD;
  readonly dayOfWeek: DayOfWeek;
  readonly startDatetime: TZDateTime;
  readonly endDatetime: TZDateTime;
  readonly breakSecond: number;
  readonly workSecond: number;

  constructor(params: {
    date: YYYYmmDD;
    dayOfWeek: DayOfWeek;
    startDatetime: TZDateTime;
    endDatetime: TZDateTime;
    breakSecond: number;
    workSecond: number;
  }) {
    this.date = params.date;
    this.dayOfWeek = params.dayOfWeek;
    this.startDatetime = params.startDatetime;
    this.endDatetime = params.endDatetime;
    this.breakSecond = params.breakSecond;
    this.workSecond = params.workSecond;
  }

  static replaceAndCreate(params: {
    dailyLogs: DailyLog[];
    replace: DailyLog;
  }) {
    if (!params.dailyLogs.find((log) => log.id === params.replace.id)) {
      throw new Error("置き換える対象のログが存在しません。");
    }

    const replacedLogs = params.dailyLogs
      .map((log) => {
        if (log.id === params.replace.id) {
          return params.replace;
        }
        return log;
      })
      .sort((a, b) => a.datetime.getTimeMilliSecond() - b.datetime.getTimeMilliSecond()) as [
      DailyLog,
      ...DailyLog[],
    ];

    const agg = replacedLogs.reduce(
      (acc, cur, i) => {
        if (cur.state === "leave") {
          return {
            ...acc,
            endDatetime: cur.datetime,
            prevDatetime: cur.datetime,
          };
        }

        return {
          ...acc,
          endDatetime: cur.datetime,
          prevDatetime: cur.datetime,
          breakSecond:
            acc.breakSecond + (cur.datetime.getTimeSecond() - acc.prevDatetime.getTimeSecond()),
        };
      },
      {
        startDatetime: replacedLogs[0].datetime,
        endDatetime: replacedLogs[0].datetime,
        prevDatetime: replacedLogs[0].datetime,
        breakSecond: 0,
      },
    );

    const date = agg.startDatetime.getYYYYmmDD();

    return new DailyAttendance({
      date,
      dayOfWeek: DayOfWeekFactory.of(date),
      startDatetime: agg.startDatetime,
      endDatetime: agg.endDatetime,
      breakSecond: agg.breakSecond,
      workSecond: new WorkTime({
        startDatetime: agg.startDatetime,
        endDatetime: agg.endDatetime,
      }).calcWorkSecond(agg.breakSecond),
    });
  }
}

export class ScheduledAttendance {
  readonly date: YYYYmmDD;
  readonly dayOfWeek: DayOfWeek;
  readonly startDatetime: undefined;
  readonly endDatetime: undefined;
  readonly breakSecond: undefined;
  readonly workSecond: undefined;

  constructor(params: {
    date: YYYYmmDD;
    dayOfWeek: DayOfWeek;
  }) {
    this.date = params.date;
    this.dayOfWeek = params.dayOfWeek;
  }
}
