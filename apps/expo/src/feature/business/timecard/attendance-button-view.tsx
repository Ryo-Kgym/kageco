import { convertToYmd } from "@/util/date/convertToYmd";
import type { AttendanceState } from "@/util/domain/business/timecard/attendance-state";
import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";
import { attendOrLeaveWork, fetchAttendanceByDate } from "./attendance-api";
import { AttendanceEditModal } from "./attendance-edit-modal";
import { AttendanceLogsView } from "./attendance-logs-view";
import { MonthlyPlannedView } from "./monthly-planned-view";
import type { AttendanceLog, MonthlyPlanned, Remaining } from "./types";

/**
 * 出勤・退勤ボタンのUI表示コンポーネント
 */
export const AttendanceButtonView = () => {
  const { userId } = useSaveUserId();
  const { groupId } = useSaveGroupId();
  const [now, setNow] = useState<Date>(new Date());

  const [attendanceState, setAttendanceState] =
    useState<AttendanceState>("attend");
  // ボタンの無効化状態を管理するstate
  const [isLoading, setIsLoading] = useState(false);

  // モーダル関連の状態
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedLog, setSelectedLog] = useState<AttendanceLog | null>(null);
  const [editableDateTime, setEditableDateTime] = useState<string>("");
  const [editableMemo, setEditableMemo] = useState<string>("");

  const [monthlyState, setMonthlyState] = useState<{
    attendanceLogs: AttendanceLog[];
    totalWorkSecond: number;
    monthlyPlanned?: MonthlyPlanned;
    remaining?: Remaining;
  }>({
    attendanceLogs: [],
    totalWorkSecond: 0,
  });

  // 日付・ユーザー・グループの変更時に状態を取得する
  useEffect(() => {
    // 初期状態を取得する処理
    const fetchInitialState = async () => {
      try {
        setIsLoading(true);

        const baseDate = convertToYmd(now);
        // APIを呼び出して現在の状態を取得する
        const data = await fetchAttendanceByDate(baseDate, userId, groupId);

        setAttendanceState(data.lastState);
        setMonthlyState({
          attendanceLogs: data.baseDateLogs,
          totalWorkSecond: data.totalWorkSecond,
          monthlyPlanned: data.monthlyPlanned ?? undefined,
          remaining: data.remaining,
        });
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
  }, [userId, groupId, now]);

  /**
   * 前の日へ移動する
   */
  const handlePrevDay = () => {
    if (isLoading) return;
    setNow(
      (prev) =>
        new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() - 1),
    );
  };

  /**
   * 次の日へ移動する
   */
  const handleNextDay = () => {
    if (isLoading) return;
    setNow(
      (prev) =>
        new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1),
    );
  };

  // 出勤・退勤ボタンのクリックハンドラ
  const handleAttendanceButtonClick = async () => {
    try {
      setIsLoading(true);

      // APIを呼び出して出勤・退勤を記録する
      const data = await attendOrLeaveWork(userId, groupId);

      // 次の状態を設定する
      setAttendanceState(data.nextState);

      // 勤怠ログを更新するために再取得する
      const baseDate = convertToYmd(now);
      const updatedData = await fetchAttendanceByDate(
        baseDate,
        userId,
        groupId,
      );
      setMonthlyState({
        attendanceLogs: updatedData.baseDateLogs,
        totalWorkSecond: updatedData.totalWorkSecond,
        monthlyPlanned: updatedData.monthlyPlanned ?? undefined,
        remaining: updatedData.remaining,
      });
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("エラー", "出勤・退勤の記録に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ログ行タップ時のハンドラ
   * 子要素（AttendanceLogsView）から渡されるログを保持し、モーダルを開く
   */
  const handleLogPress = (log: AttendanceLog) => {
    setSelectedLog(log);
    setEditableDateTime(log.datetime.tzDateTime);
    setEditableMemo(log.memo ?? "");
    setIsModalVisible(true);
  };

  /**
   * モーダルを閉じる
   */
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  /**
   * 更新ボタン（現時点ではアクション未実装）
   * TODO: API連携して勤怠ログの更新を行う
   */
  const handleUpdate = () => {
    // ここではまだアクション不要
    // 例：console.log('更新', { editableDateTime, editableMemo, selectedLog });
  };

  return (
    <View style={styles.container}>
      {/* 日付ナビゲーション */}
      <View style={styles.navContainer}>
        <TouchableOpacity
          style={[styles.navButton, isLoading && styles.disabledButton]}
          onPress={handlePrevDay}
          disabled={isLoading}
        >
          <Text style={styles.navButtonText}>{"＜ 前の日"}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{convertToYmd(now)}</Text>
        <TouchableOpacity
          style={[styles.navButton, isLoading && styles.disabledButton]}
          onPress={handleNextDay}
          disabled={isLoading}
        >
          <Text style={styles.navButtonText}>{"次の日 ＞"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.attendanceButton,
            attendanceState === "leave"
              ? styles.attendButton
              : styles.leaveButton,
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
      <AttendanceLogsView
        logs={monthlyState.attendanceLogs}
        onItemPress={handleLogPress}
      />

      <MonthlyPlannedView
        totalWorkSecond={monthlyState.totalWorkSecond}
        monthlyPlanned={monthlyState.monthlyPlanned}
        remaining={monthlyState.remaining}
      />

      <AttendanceEditModal
        visible={isModalVisible}
        selectedLog={selectedLog}
        editableDateTime={editableDateTime}
        setEditableDateTime={setEditableDateTime}
        editableMemo={editableMemo}
        setEditableMemo={setEditableMemo}
        onClose={handleCloseModal}
        onUpdate={handleUpdate}
      />
    </View>
  );
};

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    backgroundColor: "#f5f5f5",
    color: "#333",
  },
  navContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  navButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#2196F3",
    borderRadius: 6,
  },
  navButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  buttonContainer: {
    marginBottom: 8,
    alignItems: "center",
  },
  attendanceButton: {
    width: "80%",
    height: 70,
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
  // モーダル関連
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalContainer: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 12,
  },
  modalRow: {
    marginBottom: 12,
  },
  modalLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  modalValue: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fafafa",
  },
  memoInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  smallButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  primaryButton: {
    backgroundColor: "#1976D2",
  },
  secondaryButton: {
    backgroundColor: "#9E9E9E",
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});
