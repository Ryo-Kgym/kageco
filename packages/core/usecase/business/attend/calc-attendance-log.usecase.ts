import type { TZDateTime, YYYYmmDD } from "@/util/date/date";

import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import { LeaveWork } from "../../../domain/business/attend/LeaveWork";
import { AttendAtWork } from "../../../domain/business/attend/attend-at-work";
import type { FindLastAttendanceLogGateway } from "../../../gateway/business/attend/FindLastAttendanceLogGateway";
import type { BusinessUsecase } from "../BusinessUsecase";

export class CalcAttendanceLogUsecase
  implements BusinessUsecase<CalcAttendanceLogInput, CalcAttendanceLogOutput>
{
  constructor(
    private readonly attendanceGateway: FindLastAttendanceLogGateway,
  ) {
    this.attendanceGateway = attendanceGateway;
  }

  async handle(input: CalcAttendanceLogInput) {
    const lastLog = await this.attendanceGateway.findBy(input.currentDate);

    switch (lastLog.state) {
      case "attend": {
        const { startDatetime, endDatetime } = new LeaveWork({
          lastAttendedTime: lastLog.startDatetime,
        }).leave(input.currentTZDatetime);

        return {
          dailyAttendanceId: lastLog.dailyAttendanceId,
          nextState: "leave" as const,
          startDatetime,
          endDatetime,
          breakSecond: lastLog.breakSecond,
        };
      }
      case "leave": {
        const { breakSecond } = new AttendAtWork({
          lastLeaveTime: lastLog.endDatetime,
        }).attend(input.currentTZDatetime);

        return {
          dailyAttendanceId: lastLog.dailyAttendanceId,
          nextState: "attend" as const,
          startDatetime: lastLog.startDatetime,
          endDatetime: lastLog.endDatetime,
          breakSecond: lastLog.breakSecond + breakSecond,
        };
      }
    }
  }
}

export type CalcAttendanceLogInput = {
  currentDate: YYYYmmDD;
  currentTZDatetime: TZDateTime;
};

export type CalcAttendanceLogOutput = {
  dailyAttendanceId: string | null;
  nextState: AttendanceState;
  startDatetime: TZDateTime;
  endDatetime: TZDateTime;
  breakSecond: number;
};
