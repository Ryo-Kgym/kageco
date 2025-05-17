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
    const response = await fetch("https://home-helper.vercel.app/api/business/attendOrLeaveWork", {
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