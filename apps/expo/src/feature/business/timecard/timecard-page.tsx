import { TimecardContainer } from './timecard-container';

/**
 * 勤怠管理ページのメインコンポーネント
 * SSRを採用し、サーバーサイドでデータを取得して表示する
 */
export const TimecardPage = () => {
  return <TimecardContainer />;
};