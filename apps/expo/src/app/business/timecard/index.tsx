import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { TimecardPage } from "~/feature/business/timecard";

/**
 * 勤怠管理ページ
 * SSRを採用し、サーバーサイドでデータを取得して表示する
 */
export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerTitle: "勤怠管理" }} />
      <TimecardPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1 // これが重要です
  }
});