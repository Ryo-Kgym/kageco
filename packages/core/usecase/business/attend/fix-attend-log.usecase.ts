import type { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { DailyAttendance } from "../../../domain/business/attend/daily-attendance";
import { ModifiedDateTimeIsAfterNextLogException } from "../../../exception/business/attend/modified-date-time-is-after-next-log.exception";
import { ModifiedDateTimeIsBeforePreviousLogException } from "../../../exception/business/attend/modified-date-time-is-before-previous-log.exception";
import type { FindAttendanceLogGateway } from "../../../gateway/business/attend/find-attendance-log.gateway";
import type { UpdateAttendanceLogGateway } from "../../../gateway/business/attend/update-attendance-log.gateway";
import type { BusinessUsecase } from "../BusinessUsecase";

type Input = {
  attendanceLogId: string;
  datetime: TZDateTime;
  memo: string | null;
};

type Output = {
  dailyAttendance: {
    date: YYYYmmDD;
    breakSecond: number;
  };
};

type AttendanceLog = Awaited<ReturnType<FindAttendanceLogGateway["findByLogId"]>>["log"];

export class FixAttendLogUsecase implements BusinessUsecase<Input, Output> {
  constructor(
    private readonly findAttendanceLogGateway: FindAttendanceLogGateway,
    private readonly updateAttendanceLogGateway: UpdateAttendanceLogGateway,
  ) {}

  async handle(input: Input): Promise<Output> {
    const { log, dailyLogs, attendance } = await this.findAttendanceLogGateway.findByLogId(
      input.attendanceLogId,
    );

    const prevLog = this.findPrevLog(log, dailyLogs);
    const nextLog = this.findNextLog(log, dailyLogs);

    if (prevLog && prevLog.datetime > input.datetime) {
      throw new ModifiedDateTimeIsBeforePreviousLogException();
    }

    if (nextLog && nextLog.datetime < input.datetime) {
      throw new ModifiedDateTimeIsAfterNextLogException();
    }

    const recalc = DailyAttendance.replaceAndCreate({
      dailyLogs,
      replace: {
        id: input.attendanceLogId,
        state: log.state,
        datetime: input.datetime,
      },
    });

    await this.updateAttendanceLogGateway.update({
      log: {
        id: input.attendanceLogId,
        memo: input.memo,
        datetime: input.datetime,
      },
      attendance: {
        id: attendance.id,
        breakSecond: recalc.breakSecond,
        startDatetime: recalc.startDatetime,
        endDatetime: recalc.endDatetime,
      },
    });

    return {
      dailyAttendance: {
        date: attendance.date,
        breakSecond: recalc.breakSecond,
      },
    };
  }

  private findPrevLog(log: AttendanceLog, logs: AttendanceLog[]): AttendanceLog | null {
    return logs.find((l) => l.datetime < log.datetime) ?? null;
  }

  private findNextLog(log: AttendanceLog, logs: AttendanceLog[]): AttendanceLog | null {
    return logs.find((l) => log.datetime < l.datetime) ?? null;
  }
}
