import { Text } from 'react-native';

import { TimecardPresenter } from './timecard-presenter';

/**
 * 勤怠データの型定義
 */
export interface TimecardData {
  date: string;
  startTime: string;
  endTime: string;
  breakTime: string;
  totalHours: string;
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * サーバーサイドでデータを取得する関数
 * 実際のAPIが実装されるまでのサンプルデータを返す
 */
async function fetchTimecardData(): Promise<TimecardData[]> {
  // 実際のAPIからデータを取得する処理をここに実装
  // サンプルデータを使用
  const sampleData: TimecardData[] = [
    {
      date: '2023-05-01',
      startTime: '09:00',
      endTime: '18:00',
      breakTime: '01:00',
      totalHours: '8.0',
      status: 'approved',
    },
    {
      date: '2023-05-02',
      startTime: '09:30',
      endTime: '18:30',
      breakTime: '01:00',
      totalHours: '8.0',
      status: 'approved',
    },
    {
      date: '2023-05-03',
      startTime: '09:15',
      endTime: '17:45',
      breakTime: '01:00',
      totalHours: '7.5',
      status: 'pending',
    },
  ];

  // サーバーサイドでの処理遅延をシミュレート
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return sampleData;
}

/**
 * 勤怠データを表示するコンポーネント
 * サーバーサイドで取得したデータを表示する
 */
export default async function TimecardData() {
  try {
    // サーバーサイドでデータを取得
    const timecardData = await fetchTimecardData();
    return <TimecardPresenter timecardData={timecardData} />;
  } catch (error) {
    return <Text>Error: データの取得に失敗しました</Text>;
  }
}