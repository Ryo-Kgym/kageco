/**
 * 勤怠管理に関する型定義
 */

/**
 * 勤怠ログの状態
 */
export type AttendanceState = "attend" | "leave";
export type DayOfWeek = "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";

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
    yyyyMMdd: string
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