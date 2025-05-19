import type { TZDateTime, YYYYmmDD } from "@/util/date/date";
import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";

export type DayAttendance = {
  date: YYYYmmDD;
  dayOfWeek: DayOfWeek;
  startDatetime: TZDateTime | undefined;
  endDatetime: TZDateTime | undefined;
  breakSecond: number | undefined;
  workSecond: number | undefined;
};

type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

export type AttendanceLog = {
  id: string;
  state: AttendanceState;
  datetime: TZDateTime;
};
