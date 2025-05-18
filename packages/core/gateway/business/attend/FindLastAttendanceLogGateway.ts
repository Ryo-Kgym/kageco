import type { TZDateTime, YYYYmmDD } from "@/util/date/date";

import type { AttendanceState } from "../../../domain/business/attend/AttendanceState";

export type FindLastAttendanceLogGateway = {
  findBy: (_: YYYYmmDD) => Promise<{
    dailyAttendanceId: string | null;
    datetime: YYYYmmDD;
    state: AttendanceState;
    startDatetime: TZDateTime;
    endDatetime: TZDateTime;
    breakSecond: number;
  }>;
};
