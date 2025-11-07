import { StyleSheet, Text, View } from "react-native";
import type { MonthlyPlanned, Remaining } from "./types";

type Props = {
  totalWorkSecond: number;
  monthlyPlanned: MonthlyPlanned | undefined;
  remaining: Remaining | undefined;
};

export const MonthlyPlannedView = ({ totalWorkSecond, monthlyPlanned, remaining }: Props) => {
  if (!monthlyPlanned) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>今月の予定・実績データはありません</Text>
      </View>
    );
  }

  // 時間を時間と分に変換する関数
  const formatHoursAndMinutes = (hours: number) => {
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    return `${wholeHours}時間${minutes > 0 ? `${minutes}分` : ""}`;
  };

  // 秒を時間と分に変換する関数
  const formatSecondsToHoursAndMinutes = (seconds: number) => {
    const hours = seconds / 3600;
    return formatHoursAndMinutes(hours);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>今月の予定・実績</Text>

      <Text style={styles.subtitle}>予定</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>稼働日数:</Text>
        <Text style={styles.value}>{monthlyPlanned.businessDays}日</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>労働時間:</Text>
        <Text style={styles.value}>
          {formatHoursAndMinutes(monthlyPlanned.workHoursLower)}
          {" 〜 "}
          {formatHoursAndMinutes(monthlyPlanned.workHoursUpper)}
        </Text>
      </View>

      {remaining && (
        <>
          <View style={styles.sectionDivider} />
          <Text style={styles.subtitle}>実績</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>合計労働時間:</Text>
            <Text style={styles.value}>{formatSecondsToHoursAndMinutes(totalWorkSecond)}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>残り稼働日数:</Text>
            <Text style={styles.value}>{remaining.businessDays}日</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>残り最低勤務時間:</Text>
            <Text style={styles.value}>
              {formatSecondsToHoursAndMinutes(remaining.workSecondLower)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>推奨日次勤務時間:</Text>
            <Text style={styles.value}>
              {formatSecondsToHoursAndMinutes(remaining.recommendedDailyWorkSecond)}
            </Text>
          </View>
        </>
      )}
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
    marginBottom: 12,
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
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 4,
    marginBottom: 8,
    color: "#333",
  },
  sectionDivider: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginVertical: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  label: {
    fontSize: 16,
    color: "#666",
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
    paddingVertical: 16,
  },
});
