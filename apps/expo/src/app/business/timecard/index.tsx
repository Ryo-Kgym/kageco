import { Redirect } from "expo-router";

/**
 * 勤怠管理ページ
 * 出勤・退勤ボタンタブにリダイレクトする
 */
export default function Page() {
  return <Redirect href="/business/timecard/button" />;
}
