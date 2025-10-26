import type { UpdateAttendanceLogGateway } from "@/core/gateway/business/attend/update-attendance-log.gateway";
// GraphQL: 日次勤怠の更新（既存の生成済みDocumentを使用）
import { UpdateDailyAttendanceDocument } from "@v3/graphql/business/schema/mutate/v5/mutateDailyAttendance.generated";

import { execMutation } from "../../../../persistence/database/server/execMutation";
import { UpdateDailyAttendanceLogDocument } from "./update-daily-attendance-log-document";

export class ApiUpdateAttendanceLogRepository
  implements UpdateAttendanceLogGateway
{
  async update(params: {
    log: {
      id: string;
      memo: string | null;
      datetime: import("@/util/date/date").TZDateTime;
    };
    attendance: {
      id: string;
      breakSecond: number;
      startDatetime: import("@/util/date/date").TZDateTime;
      endDatetime: import("@/util/date/date").TZDateTime;
    };
  }) {
    // 1. ログ更新
    await execMutation(UpdateDailyAttendanceLogDocument, {
      id: params.log.id,
      set: {
        memo: params.log.memo,
        datetime: params.log.datetime.toString(),
      },
    });

    // 2. 日次勤怠更新（休憩秒数、開始・終了時刻）
    await execMutation(UpdateDailyAttendanceDocument, {
      id: params.attendance.id,
      set: {
        breakSecond: params.attendance.breakSecond,
        startDatetime: params.attendance.startDatetime.toString(),
        endDatetime: params.attendance.endDatetime.toString(),
      },
    });

    return { count: 1 };
  }
}
