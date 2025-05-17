import { YYYYmmDD } from "@/type/date/date";
import { NextResponse } from "next/server";
import { fetchDailyAttendance } from "../../../../features/businessTimeCard/server/fetchDailyAttendance";

/**
 * 月次の勤怠データを取得するAPIエンドポイント
 */
export async function GET(request: Request) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const baseDate = searchParams.get("baseDate");

    // 必須パラメータの検証
    if (!baseDate) {
      return NextResponse.json(
        { error: "baseDate is required" },
        { status: 400 },
      );
    }

    // 日付形式の検証
    if (!/^\d{4}-\d{2}-\d{2}$/.test(baseDate)) {
      return NextResponse.json(
        { error: "baseDate must be in YYYY-MM-DD format" },
        { status: 400 },
      );
    }

    // 勤怠データを取得
    const attendanceData = await fetchDailyAttendance(baseDate as any);

    // レスポンスを返す
    return NextResponse.json(attendanceData);
  } catch (error) {
    console.error("Error in fetchMonthlyAttendance API:", error);
    return NextResponse.json(
      { error: "Failed to fetch monthly attendance data" },
      { status: 500 },
    );
  }
}
