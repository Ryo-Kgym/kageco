import type { FindAttendanceLogGateway } from "@/core/gateway/business/attend/find-attendance-log.gateway";
import type { YYYY_MM_DD, YYYY_MM_DD_HH_MM_SS } from "@/util/date/date";
import { TZDateTime, YYYYmmDD } from "@/util/date/date";

import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import { GetAttendanceLogByIdDocument } from "@v3/graphql/business/schema/query/v5/queryDailyAttendance.generated";
import { execQuery } from "../../../../persistence/database/server/execQuery";

export class ApiFindAttendanceLogRepository implements FindAttendanceLogGateway {
  async findByLogId(attendanceLogId: string) {
    const { data } = await execQuery(GetAttendanceLogByIdDocument, {
      id: attendanceLogId,
    });

    const row = data.log;
    if (!row || !row.dailyAttendance) {
      throw new Error("Attendance log not found");
    }

    const daily = row.dailyAttendance;

    return {
      log: {
        id: row.id,
        state: row.state as AttendanceState,
        memo: row.memo,
        datetime: new TZDateTime(row.datetime as YYYY_MM_DD_HH_MM_SS),
      },
      dailyLogs: daily.logs
        .map((l) => ({
          id: l.id,
          state: l.state as AttendanceState,
          memo: l.memo,
          datetime: new TZDateTime(l.datetime as YYYY_MM_DD_HH_MM_SS),
        }))
        // 念のため時系列に整列
        .sort((a, b) => a.datetime.getTimeMilliSecond() - b.datetime.getTimeMilliSecond()),
      attendance: {
        id: daily.id,
        date: new YYYYmmDD(daily.date as YYYY_MM_DD),
        breakSecond: daily.breakSecond,
        startDatetime: new TZDateTime(daily.startDatetime as YYYY_MM_DD_HH_MM_SS),
        endDatetime: new TZDateTime(daily.endDatetime as YYYY_MM_DD_HH_MM_SS),
      },
    };
  }
}
