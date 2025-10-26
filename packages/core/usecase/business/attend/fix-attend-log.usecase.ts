import type { TZDateTime, YYYYmmDD } from "@/util/date/date";
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

type AttendanceLog = Awaited<
  ReturnType<FindAttendanceLogGateway["findByLogId"]>
>["log"];

export class FixAttendLogUsecase implements BusinessUsecase<Input, Output> {
  constructor(
    private readonly findAttendanceLogGateway: FindAttendanceLogGateway,
    private readonly updateAttendanceLogGateway: UpdateAttendanceLogGateway,
  ) {}

  async handle(input: Input): Promise<Output> {
    const { log, dailyLogs, attendance } =
      await this.findAttendanceLogGateway.findByLogId(input.attendanceLogId);

    const prevLog = this.findPrevLog(log, dailyLogs);
    const nextLog = this.fundNextLog(log, dailyLogs);

    if (prevLog && prevLog.datetime > input.datetime) {
      throw new Error(
        "修正後の日時が前のログよりも小さいです。大きくなるように指定してください。",
      );
    }

    if (nextLog && nextLog.datetime < input.datetime) {
      throw new Error(
        "修正後の日時が後のログよりも大きいです。小さくなるように指定してください。",
      );
    }

    // 修正後の日時を使って、startDatetime, endDatetime, breakSecondを再度計算する
    // TODO
    const breakSecond = 0;
    const startDatetime = input.datetime;
    const endDatetime = input.datetime;

    await this.updateAttendanceLogGateway.update({
      log: {
        id: input.attendanceLogId,
        memo: input.memo,
        datetime: input.datetime,
      },
      attendance: {
        id: attendance.id,
        breakSecond,
        startDatetime,
        endDatetime,
      },
    });

    return {
      dailyAttendance: {
        date: attendance.date,
        breakSecond: 0,
      },
    };
  }

  private findPrevLog(
    log: AttendanceLog,
    logs: AttendanceLog[],
  ): AttendanceLog | null {
    return logs.find((l) => l.datetime < log.datetime) ?? null;
  }

  private fundNextLog(
    log: AttendanceLog,
    logs: AttendanceLog[],
  ): AttendanceLog | null {
    return logs.find((l) => log.datetime < l.datetime) ?? null;
  }
}
