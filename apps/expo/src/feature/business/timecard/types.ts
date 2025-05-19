/**
 * 勤怠管理に関する型定義
 */

import type { YYYY_MM_DD } from "@/util/date/date";
import type { DayOfWeek } from "@/util/date/day-of-week";
import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";

/**
 * 勤怠ログ
 */
export interface AttendanceLog {
  id: string;
  datetime: {
    tzDateTime: string;
  };
  state: AttendanceState;
  memo?: string;
}

/**
 * 日毎の勤怠データ
 */
export interface DayAttendance {
  id: string;
  date: {
    yyyyMMdd: YYYY_MM_DD;
  };
  dayOfWeek: DayOfWeek;
  startDatetime?: {
    tzDateTime: string;
  };
  endDatetime?: {
    tzDateTime: string;
  };
  breakSecond: number;
  workSecond: number;
  logs: AttendanceLog[];
}

/**
 * 月次計画
 */
export interface MonthlyPlanned {
  businessDays: number;
  workSecondLower: number;
  workSecondUpper: number;
  workHoursLower: number;
  workHoursUpper: number;
}

/**
 * 残り勤務情報
 */
export interface Remaining {
  businessDays: number;
  workSecondLower: number;
  recommendedDailyWorkSecond: number;
}

/**
 * 月次勤怠データ
 */
export interface MonthlyAttendanceData {
  yearMonth: string;
  days: DayAttendance[];
  lastState: AttendanceState;
  baseDateLogs: AttendanceLog[];
  totalWorkSecond: number;
  monthlyPlanned: MonthlyPlanned;
  remaining: Remaining;
}
