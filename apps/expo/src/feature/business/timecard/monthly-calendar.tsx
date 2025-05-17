import { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from "react-native";
import { useSaveUserId } from "~/hooks/user/useSaveUserId";
import { useSaveGroupId } from "~/hooks/group/useSaveGroupId";
import { fetchMonthlyAttendance } from "./attendance-api";
import { formatTime, formatMinutes, formatSeconds } from "./utils";
import type { MonthlyAttendanceData, DayAttendance } from "./types";
import { DailyAttendanceDetail } from "./daily-attendance-detail";

/**
 * 月間カレンダーコンポーネント
 * 縦方向の表で当月のカレンダーを表示する
 */
export const MonthlyCalendar = () => {
  // ユーザーIDとグループIDを取得
  const { userId } = useSaveUserId();
  const { groupId } = useSaveGroupId();

  // 現在の年月を取得
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());

  // 勤怠データの状態
  const [loading, setLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState<MonthlyAttendanceData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 選択された日の状態
  const [selectedDay, setSelectedDay] = useState<DayAttendance | null>(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);

  // 月を変更する関数
  const changeMonth = (increment: number) => {
    const newDate = new Date(year, month + increment, 1);
    setYear(newDate.getFullYear());
    setMonth(newDate.getMonth());
  };

  // 勤怠データを取得する
  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !groupId) return;

      try {
        setLoading(true);
        setError(null);

        // 月の初日を基準日として使用
        const baseDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
        const data = await fetchMonthlyAttendance(baseDate, userId, groupId);
        console.log(data);
        setAttendanceData(data);
      } catch (err) {
        console.error("Error fetching attendance data:", err);
        setError("勤怠データの取得に失敗しました");
        Alert.alert("エラー", "勤怠データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, groupId, year, month]);

  // 月の最後の日を取得
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();

  // 日付の配列を作成
  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return {
      date: date,
      dayOfWeek: getDayOfWeekJapanese(date.getDay()),
      dayOfWeekColor: getDayOfWeekColor(date.getDay()),
    };
  });

  // 勤怠データから日付ごとのデータを取得する関数
  const getAttendanceForDate = (date: Date): DayAttendance | undefined => {
    if (!attendanceData) return undefined;

    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return attendanceData.days.find(day => day.date.toString() === dateString);
  };

  // 日付をタップしたときのハンドラ
  const handleDayPress = (day: DayAttendance) => {
    setSelectedDay(day);
    setDetailModalVisible(true);
  };

  // 詳細モーダルを閉じるハンドラ
  const handleCloseDetail = () => {
    setDetailModalVisible(false);
  };

  return (
    <View style={styles.calendarContainer}>
      {/* 月切り替えナビゲーション */}
      <View style={styles.navigation}>
        <TouchableOpacity onPress={() => changeMonth(-1)} style={styles.navButton}>
          <Text style={styles.navButtonText}>前月</Text>
        </TouchableOpacity>
        <Text style={styles.monthTitle}>{`${year}年${month + 1}月`}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)} style={styles.navButton}>
          <Text style={styles.navButtonText}>翌月</Text>
        </TouchableOpacity>
      </View>

      {/* 月次サマリー */}
      {attendanceData && (
        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            予定: {attendanceData.monthlyPlanned.businessDays}日 / 
            {formatSeconds(attendanceData.monthlyPlanned.workSecondLower)}〜
            {formatSeconds(attendanceData.monthlyPlanned.workSecondUpper)}
          </Text>
          <Text style={styles.summaryText}>
            実績: {formatSeconds(attendanceData.totalWorkSecond)} / 
            残り: {attendanceData.remaining.businessDays}日
          </Text>
        </View>
      )}

      {/* カレンダーヘッダー */}
      <View style={styles.headerRow}>
        <Text style={styles.headerCell}>日</Text>
        <Text style={styles.headerCell}>曜日</Text>
        <Text style={styles.headerCell}>出勤</Text>
        <Text style={styles.headerCell}>退勤</Text>
        <Text style={styles.headerCell}>休憩</Text>
      </View>

      {/* ローディング表示 */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>データを読み込み中...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollView}>
          {calendarDays.map((day, index) => {
            const attendanceDay = getAttendanceForDate(day.date);
            return (
              <TouchableOpacity 
                key={index} 
                style={isToday(day.date) ? styles.todayRow : styles.row}
                onPress={() => attendanceDay && handleDayPress(attendanceDay)}
                disabled={!attendanceDay}
              >
                <Text style={styles.dateCell}>{day.date.getDate()}</Text>
                <Text style={[styles.dayCell, { color: day.dayOfWeekColor }]}>
                  {day.dayOfWeek}
                </Text>
                <Text style={styles.cell}>
                  {attendanceDay?.startDatetime ? formatTime(attendanceDay.startDatetime.parseDate()) : ""}
                </Text>
                <Text style={styles.cell}>
                  {attendanceDay?.endDatetime ? formatTime(attendanceDay.endDatetime.parseDate()) : ""}
                </Text>
                <Text style={styles.cell}>
                  {attendanceDay ? formatMinutes(attendanceDay.breakSecond) : ""}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* 日毎の詳細モーダル */}
      {selectedDay && (
        <DailyAttendanceDetail
          day={selectedDay}
          visible={detailModalVisible}
          onClose={handleCloseDetail}
        />
      )}
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
  // 月切り替えナビゲーション
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  navButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  navButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  // 月次サマリー
  summary: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
  },
  // ローディングと表示
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "#F44336",
    textAlign: "center",
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
