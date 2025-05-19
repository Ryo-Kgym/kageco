import { FlatList, StyleSheet, Text, View } from "react-native";
import type { AttendanceLog } from "./types";
import { formatTime } from "./utils";

/**
 * 勤怠ログ一覧表示コンポーネント
 */
interface AttendanceLogsViewProps {
  logs: AttendanceLog[];
}

export const AttendanceLogsView = ({ logs }: AttendanceLogsViewProps) => {
  if (!logs || logs.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>本日の勤怠記録はありません</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>本日の勤怠記録</Text>
      <FlatList
        data={logs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <View style={styles.stateContainer}>
              <View
                style={[
                  styles.stateIndicator,
                  item.state === "attend"
                    ? styles.attendIndicator
                    : styles.leaveIndicator,
                ]}
              />
              <Text style={styles.stateText}>
                {item.state === "attend" ? "出勤" : "退勤"}
              </Text>
            </View>
            <Text style={styles.timeText}>
              {formatTime(item.datetime.tzDateTime)}
            </Text>
          </View>
        )}
        style={styles.list}
      />
    </View>
  );
};

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  list: {
    maxHeight: 200,
  },
  logItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  stateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  stateIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  attendIndicator: {
    backgroundColor: "#4CAF50", // 緑色
  },
  leaveIndicator: {
    backgroundColor: "#F44336", // 赤色
  },
  stateText: {
    fontSize: 16,
    color: "#333",
  },
  timeText: {
    fontSize: 16,
    color: "#666",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingVertical: 16,
  },
});
