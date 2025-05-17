import { StyleSheet, Text, View } from "react-native";
import { MonthlyCalendar } from "./monthly-calendar";

/**
 * 勤怠管理のUI表示コンポーネント
 */
export const TimecardView = () => {
  return (
    <View style={styles.container}>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
});
