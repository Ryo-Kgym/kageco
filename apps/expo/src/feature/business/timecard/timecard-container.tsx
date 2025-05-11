import { Text } from 'react-native';
import { Suspense } from 'react';

// サーバーコンポーネントをインポート
import TimecardData from './timecard-data';

/**
 * 勤怠管理のコンテナコンポーネント
 * サーバーサイドでデータを取得し、プレゼンターに渡す
 */
export const TimecardContainer = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      {/* @ts-expect-error Server Component */}
      <TimecardData />
    </Suspense>
  );
};