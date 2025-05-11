import { View, Text, FlatList, StyleSheet } from 'react-native';

import { TimecardData } from './timecard-data';

/**
 * 勤怠管理のプレゼンターコンポーネントのProps
 */
interface TimecardPresenterProps {
  timecardData: TimecardData[];
}

/**
 * 勤怠管理のプレゼンターコンポーネント
 * UIの表示を担当する
 */
export const TimecardPresenter = ({ timecardData }: TimecardPresenterProps) => {
  /**
   * ステータスに応じた色を返す
   */
  const getStatusColor = (status: TimecardData['status']) => {
    switch (status) {
      case 'approved':
        return '#4CAF50'; // 緑
      case 'rejected':
        return '#F44336'; // 赤
      case 'pending':
      default:
        return '#FFC107'; // 黄色
    }
  };

  /**
   * ステータスの日本語表記を返す
   */
  const getStatusText = (status: TimecardData['status']) => {
    switch (status) {
      case 'approved':
        return '承認済';
      case 'rejected':
        return '却下';
      case 'pending':
      default:
        return '承認待ち';
    }
  };

  /**
   * 日付を日本語表記に変換する
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  /**
   * 勤怠データの各項目をレンダリングする
   */
  const renderItem = ({ item }: { item: TimecardData }) => (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(item.date)}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusText(item.status)}</Text>
        </View>
      </View>
      <View style={styles.timeInfo}>
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>出勤時間:</Text>
          <Text style={styles.timeValue}>{item.startTime}</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>退勤時間:</Text>
          <Text style={styles.timeValue}>{item.endTime}</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>休憩時間:</Text>
          <Text style={styles.timeValue}>{item.breakTime}</Text>
        </View>
        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>合計時間:</Text>
          <Text style={styles.timeValue}>{item.totalHours}時間</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>勤怠記録</Text>
      {timecardData.length === 0 ? (
        <Text style={styles.emptyText}>勤怠データがありません</Text>
      ) : (
        <FlatList
          data={timecardData}
          renderItem={renderItem}
          keyExtractor={(item) => item.date}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timeInfo: {
    marginTop: 8,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
  },
  timeValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    fontSize: 16,
    color: '#666',
  },
});