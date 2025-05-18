/**
 * 勤怠管理のAPI通信を担当するモジュール
 */

import { paths } from "~/app/paths";

/**
 * 出勤・退勤の状態を取得または切り替えるAPIを呼び出す
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 次の状態（"attend" または "leave"）
 */
export const attendOrLeaveWork = async (
  userId: string,
  groupId: string,
): Promise<{ nextState: "attend" | "leave" }> => {
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
export const fetchAttendanceState = async (
  baseDate: string,
  userId: string,
  groupId: string,
): Promise<{ lastState: "attend" | "leave" }> => {
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
) => {
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
