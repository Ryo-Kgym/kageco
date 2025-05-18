import dayjs from "dayjs";

// 日本時間に変換する
import "dayjs/locale/ja";

import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.locale("ja");
dayjs.extend(utc);
dayjs.extend(timezone);

// FIXME React Nativeでエラー発生
const jaDayjs = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  toInstance: (date: Date) => dayjs(date).tz("Asia/Tokyo"),
};

export default jaDayjs;
