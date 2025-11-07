import type { FindLastAttendanceLogGateway } from "@/core/gateway/business/attend/FindLastAttendanceLogGateway";
import { TZDateTime, type YYYYmmDD } from "@/util/date/date";
import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import { GetAttendanceDocument } from "@v3/graphql/business/schema/query/v5/queryDailyAttendance.generated";
import { execQuery } from "../../../../persistence/database/server/execQuery";

export class ApiFindLastAttendanceLogRepository implements FindLastAttendanceLogGateway {
  constructor(
    private readonly userId: string,
    private readonly groupId: string,
  ) {
    this.userId = userId;
    this.groupId = groupId;
  }

  async findBy(now: YYYYmmDD) {
    const attendance = await execQuery(GetAttendanceDocument, {
      date: now.toString(),
      userId: this.userId,
      groupId: this.groupId,
    });

    const dailyAttendanceId = attendance.data.day[0]?.id ?? null;

    if (attendance.data.day[0]) {
      const logs = attendance.data.day[0].logs ?? [];
      const lastLog = logs[logs.length - 1];

      return {
        dailyAttendanceId,
        datetime: now,
        state: (lastLog?.state ?? "attend") as AttendanceState,
        startDatetime: new TZDateTime(attendance.data.day[0].startDatetime),
        endDatetime: new TZDateTime(attendance.data.day[0].endDatetime),
        breakSecond: attendance.data.day[0].breakSecond,
      };
    }

    return {
      dailyAttendanceId,
      datetime: now,
      state: "leave" as const,
      startDatetime: now.parseTZDateTime(),
      endDatetime: now.parseTZDateTime(),
      breakSecond: 0,
    };
  }
}
