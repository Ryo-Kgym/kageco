/**
 * 勤怠管理のAPI通信を担当するモジュール
 */

import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import { paths } from "~/app/paths";
import type {
  AttendanceLog,
  MonthlyAttendanceData,
  MonthlyPlanned,
  Remaining,
} from "~/feature/business/timecard/types";

/**
 * 出勤・退勤の状態を取得または切り替えるAPIを呼び出す
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 次の状態（"attend" または "leave"）
 */
export const attendOrLeaveWork = async (
  userId: string,
  groupId: string,
): Promise<{ nextState: AttendanceState }> => {
  const response = await fetch(paths.api.business.attendOrLeaveWork.post(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      groupId,
    }),
  });

  if (!response.ok) {
    throw new Error("APIリクエストに失敗しました");
  }

  return await response.json();
};

/**
 * 現在の出勤・退勤状態を取得する
 * @param baseDate 基準日（YYYY-MM-DD形式）
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 現在の状態（"attend" または "leave"）
 */
export const fetchAttendanceByDate = async (
  baseDate: string,
  userId: string,
  groupId: string,
): Promise<{
  lastState: AttendanceState;
  baseDateLogs: Array<AttendanceLog>;
  totalWorkSecond: number;
  monthlyPlanned: MonthlyPlanned | null;
  remaining: Remaining;
}> => {
  const response = await fetch(
    paths.api.business.attendOrLeaveWork.get({
      baseDate,
      userId,
      groupId,
    }),
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("勤怠データの取得に失敗しました");
  }

  return await response.json();
};

/**
 * 月次の勤怠データを取得する
 * @param baseDate 基準日（YYYY-MM-DD形式）
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 月次の勤怠データ
 */
export const fetchMonthlyAttendance = async (
  baseDate: string,
  userId: string,
  groupId: string,
): Promise<MonthlyAttendanceData> => {
  const response = await fetch(
    paths.api.business.attendOrLeaveWork.get({
      baseDate,
      userId,
      groupId,
    }),
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("月次勤怠データの取得に失敗しました");
  }

  return await response.json();
};

/**
 * 勤怠ログを修正する
 * @param attendanceLogId ログID
 * @param datetime ISO(UTC, 秒精度, 末尾Z) 例: 2025-10-26T15:30:00Z
 * @param memo メモ（未入力時は null 推奨）
 */
export const fixAttendLog = async (
  attendanceLogId: string,
  datetime: string,
  memo: string | null,
): Promise<{ dailyAttendance: { date: string; breakSecond: number } }> => {
  const response = await fetch(paths.api.business.fixAttendLog.post(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attendanceLogId, datetime, memo }),
  });

  if (!response.ok) {
    const msg = await response.text().catch(() => "");
    throw new Error(`勤怠ログの修正に失敗しました: ${msg}`);
  }

  return await response.json();
};
