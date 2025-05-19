import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";

export type SaveAttendanceLogGateway = {
  save: (_: {
    date: Date;
    startDatetime: Date;
    endDatetime: Date | null;
    time: Date;
    type: AttendanceState;
    memo: string;
  }) => void;
};
