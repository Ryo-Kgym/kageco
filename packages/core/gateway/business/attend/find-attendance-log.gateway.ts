import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";

type AttendanceLog = {
  id: string;
  state: AttendanceState;
  memo: string | null;
  datetime: Date;
};

export interface FindAttendanceLogGateway {
  findByLogId: (attendanceLogId: string) => Promise<{
    log: AttendanceLog;
    dailyLogs: AttendanceLog[];
    attendance: {
      id: string;
      date: Date;
      breakSecond: number;
      startDatetime: Date;
      endDatetime: Date;
    };
  }>;
}
