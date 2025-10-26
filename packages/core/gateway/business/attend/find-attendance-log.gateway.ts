import type { TZDateTime, YYYYmmDD } from "@/util/date/date";
import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";

type AttendanceLog = {
  id: string;
  state: AttendanceState;
  memo: string | null;
  datetime: TZDateTime;
};

export interface FindAttendanceLogGateway {
  findByLogId: (attendanceLogId: string) => Promise<{
    log: AttendanceLog;
    dailyLogs: AttendanceLog[];
    attendance: {
      id: string;
      date: YYYYmmDD;
      breakSecond: number;
      startDatetime: TZDateTime;
      endDatetime: TZDateTime;
    };
  }>;
}
