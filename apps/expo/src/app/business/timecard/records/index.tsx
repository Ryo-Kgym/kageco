import { StyleSheet, View } from "react-native";
import { AttendanceRecordsView } from "~/feature/business/timecard/attendance-records-view";

/**
 * 勤怠記録タブのページコンポーネント
 */
export default function RecordsPage() {
  return (
    <View style={styles.container}>
      <AttendanceRecordsView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
