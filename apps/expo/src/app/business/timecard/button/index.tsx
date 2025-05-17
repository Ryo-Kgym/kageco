import { StyleSheet, View } from "react-native";
import { AttendanceButtonView } from "~/feature/business/timecard/attendance-button-view";

/**
 * 出勤・退勤ボタンタブのページコンポーネント
 */
export default function ButtonPage() {
  return (
    <View style={styles.container}>
      <AttendanceButtonView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});