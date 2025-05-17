import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { MonthlyCalendar } from "./monthly-calendar";
import { attendOrLeaveWork, fetchAttendanceState } from "./attendance-api";

/**
 * 勤怠管理のUI表示コンポーネント
 */
export const TimecardView = () => {
  // ユーザーIDとグループIDを取得
  const { userId } = useSaveUserId();
  const { groupId } = useSaveGroupId();

  // 出勤・退勤の状態を管理するstate
  const [attendanceState, setAttendanceState] = useState<"attend" | "leave">("attend");
  // ボタンの無効化状態を管理するstate
  const [isLoading, setIsLoading] = useState(false);

  // 初期状態を取得する
  useEffect(() => {
    // 初期状態を取得する処理
    const fetchInitialState = async () => {
      try {
        setIsLoading(true);

        // APIを呼び出して現在の状態を取得する
        const data = await fetchAttendanceState(userId, groupId);

        // 次の状態を設定する
        setAttendanceState(data.nextState);
      } catch (error) {
        console.error("Error fetching initial state:", error);
        // 初期状態の取得に失敗した場合はデフォルト値を使用
      } finally {
        setIsLoading(false);
      }
    };

    if (userId && groupId) {
      fetchInitialState();
    }
  }, [userId, groupId]);

  // 出勤・退勤ボタンのクリックハンドラ
  const handleAttendanceButtonClick = async () => {
    try {
      setIsLoading(true);

      // APIを呼び出して出勤・退勤を記録する
      const data = await attendOrLeaveWork(userId, groupId);

      // 次の状態を設定する
      setAttendanceState(data.nextState);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("エラー", "出勤・退勤の記録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.attendanceButton,
            attendanceState === "leave" ?styles.attendButton: styles.leaveButton ,
            isLoading && styles.disabledButton,
          ]}
          onPress={handleAttendanceButtonClick}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {attendanceState === "leave" ? "出勤" : "退勤"}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>勤怠記録</Text>
      <MonthlyCalendar />
    </View>
  );
};

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  buttonContainer: {
    marginBottom: 24,
    alignItems: "center",
  },
  attendanceButton: {
    width: "80%",
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  attendButton: {
    backgroundColor: "#4CAF50", // 緑色
  },
  leaveButton: {
    backgroundColor: "#F44336", // 赤色
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
});
