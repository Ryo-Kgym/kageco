import { TimecardView } from "~/feature/business/timecard/timecard-view";
/**
 * 勤怠管理ページのメインコンポーネント
 * SSRを採用し、サーバーサイドでデータを取得して表示する
 */
export const TimecardPage = () => {
  return (
    <TimecardView />
  );
};