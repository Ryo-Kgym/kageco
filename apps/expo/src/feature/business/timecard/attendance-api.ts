/**
 * 勤怠管理のAPI通信を担当するモジュール
 */

/**
 * 出勤・退勤の状態を取得または切り替えるAPIを呼び出す
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 次の状態（"attend" または "leave"）
 */
export const attendOrLeaveWork = async (
  userId: string,
  groupId: string
): Promise<{ nextState: "attend" | "leave" }> => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_NEXT_API_ENDPOINT_ROOT ?? ""}/api/business/attendOrLeaveWork`, {
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
  } catch (error) {
    console.error("Error in attendOrLeaveWork API:", error);
    throw error;
  }
};

/**
 * 現在の出勤・退勤状態を取得する
 * @param userId ユーザーID
 * @param groupId グループID
 * @returns 現在の状態（"attend" または "leave"）
 */
export const fetchAttendanceState = async (
  userId: string,
  groupId: string
): Promise<{ nextState: "attend" | "leave" }> => {
  return attendOrLeaveWork(userId, groupId);
};

/**
 * 月次の勤怠データを取得する
 * @param baseDate 基準日（YYYY-MM-DD形式）
 * @returns 月次の勤怠データ
 */
export const fetchMonthlyAttendance = async (baseDate: string) => {
  try {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_NEXT_API_ENDPOINT_ROOT ?? ""}/api/business/fetchMonthlyAttendance?baseDate=${baseDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("月次勤怠データの取得に失敗しました");
    }

    return await response.json();
  } catch (error) {
    console.error("Error in fetchMonthlyAttendance API:", error);
    throw error;
  }
};
