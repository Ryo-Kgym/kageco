import { StyleSheet, Text, View, ScrollView } from "react-native";

/**
 * 月間カレンダーコンポーネント
 * 縦方向の表で当月のカレンダーを表示する
 */
export const MonthlyCalendar = () => {
  // 現在の年月を取得
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  // 月の最初の日と最後の日を取得
  const lastDay = new Date(year, month + 1, 0);

  // 月の日数分の配列を作成
  const daysInMonth = lastDay.getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return {
      date: date,
      dayOfWeek: getDayOfWeekJapanese(date.getDay()),
      dayOfWeekColor: getDayOfWeekColor(date.getDay()),
    };
  });

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>日</Text>
        <Text style={styles.headerCell}>曜日</Text>
        <Text style={styles.headerCell}>出勤</Text>
        <Text style={styles.headerCell}>退勤</Text>
        <Text style={styles.headerCell}>休憩</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {days.map((day, index) => (
          <View key={index} style={isToday(day.date) ? styles.todayRow : styles.row}>
            <Text style={styles.dateCell}>{day.date.getDate()}</Text>
            <Text style={[styles.dayCell, { color: day.dayOfWeekColor }]}>
              {day.dayOfWeek}
            </Text>
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}></Text>
            <Text style={styles.cell}></Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

/**
 * 曜日の日本語表記を返す
 */
const getDayOfWeekJapanese = (dayIndex: number): string => {
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[dayIndex] as string;
};

/**
 * 曜日に応じた色を返す
 */
const getDayOfWeekColor = (dayIndex: number): string => {
  if (dayIndex === 0) return "#F44336"; // 日曜日は赤
  if (dayIndex === 6) return "#2196F3"; // 土曜日は青
  return "#333333"; // 平日は黒
};

/**
 * 指定された日付が今日かどうかを判定する
 */
const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * スタイル定義
 */
const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    height: '90%', // コンテナの高さを制限して、スクロールが必要になるようにする
  },
  scrollView: {
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    paddingBottom: 8,
    marginBottom: 8,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  todayRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#FFFDE7", // 薄い黄色
  },
  dateCell: {
    flex: 1,
    textAlign: "center",
  },
  dayCell: {
    flex: 1,
    textAlign: "center",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});
