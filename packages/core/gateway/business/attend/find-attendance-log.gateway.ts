import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";

export interface FindAttendanceLogGateway {
  findByLogId: (attendanceLogId: string) => Promise<{
    log: {
      id: string;
      state: AttendanceState;
      memo: string | null;
      datetime: Date;
    };
    dailyLogs: {
      id: string;
      state: AttendanceState;
      memo: string;
      datetime: Date;
    }[];
    attendance: {
      id: string;
      date: Date;
      breakSecond: number;
      startDatetime: Date;
      endDatetime: Date;
    };
  }>;
}
