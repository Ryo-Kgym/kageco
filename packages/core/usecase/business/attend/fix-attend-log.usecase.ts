import type { FindAttendanceLogGateway } from "../../../gateway/business/attend/find-attendance-log.gateway";
import type { UpdateAttendanceLogGateway } from "../../../gateway/business/attend/update-attendance-log.gateway";
import type { BusinessUsecase } from "../BusinessUsecase";

type Input = {
  attendanceLogId: string;
  datetime: Date;
  memo: string | null;
};

type Output = {
  dailyAttendance: {
    date: Date;
    breakSecond: number;
  };
};

export class FixAttendLogUsecase implements BusinessUsecase<Input, Output> {
  constructor(
    private readonly findAttendanceLogGateway: FindAttendanceLogGateway,
    private readonly updateAttendanceLogGateway: UpdateAttendanceLogGateway,
  ) {}

  async handle(input: Input): Promise<Output> {
    const { log, dailyLogs, attendance } =
      await this.findAttendanceLogGateway.findByLogId(input.attendanceLogId);

    // 修正対象のログの前のログを算出する。nullの場合あり
    // 修正対象のログの後のログを算出する。nullの場合あり

    // 修正対象のログの前のログが存在する場合、修正後の日時が前のログの日時よりも大きいことを検証する。NGの場合、エラー

    // 修正対象のログの後のログが存在する場合、修正後の日時が後のログの日時よりも大きいことを検証する。NGの場合、エラー

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
}
