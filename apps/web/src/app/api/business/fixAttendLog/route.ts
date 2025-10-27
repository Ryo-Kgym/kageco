import { FixAttendLogUsecase } from "@/core/usecase/business/attend/fix-attend-log.usecase";
import { TZDateTime, type YYYY_MM_DD_HH_MM_SS } from "@/util/date/date";
import { NextResponse } from "next/server";
import { ApiFindAttendanceLogRepository } from "./api-find-attendance-log-repository";
import { ApiUpdateAttendanceLogRepository } from "./api-update-attendance-log-repository";

/**
 * 勤怠ログ修正API
 * FixAttendLogUsecase を呼び出し、指定ログの日時・メモを修正し、日次勤怠の再計算結果を返す。
 *
 * Request (POST JSON):
 *   - attendanceLogId: string (必須)
 *   - datetime: string (YYYY-MM-DDTHH:mm:ssZ 形式, 必須)
 *   - memo: string | null (任意)
 *
 * Response JSON:
 *   { dailyAttendance: { date: 'YYYY-MM-DD', breakSecond: number } }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { attendanceLogId, datetime, memo } = body;

    if (!attendanceLogId || typeof attendanceLogId !== "string") {
      return NextResponse.json(
        { error: "attendanceLogId is required" },
        { status: 400 },
      );
    }

    if (!datetime || typeof datetime !== "string") {
      return NextResponse.json(
        { error: "datetime is required" },
        { status: 400 },
      );
    }

    // 簡易な形式チェック（末尾ZのISO）。厳密な検証はTZDateTimeの責務外
    if (!isYyyyMmDdHhMmSs(datetime)) {
      return NextResponse.json(
        { error: "datetime must be in ISO UTC format (YYYY-MM-DDTHH:mm:ssZ)" },
        { status: 400 },
      );
    }

    const findRepo = new ApiFindAttendanceLogRepository();
    const updateRepo = new ApiUpdateAttendanceLogRepository();
    const usecase = new FixAttendLogUsecase(findRepo, updateRepo);

    const output = await usecase.handle({
      attendanceLogId,
      datetime: new TZDateTime(datetime),
      memo: typeof memo === "string" ? memo : (memo ?? null),
    });

    return NextResponse.json({
      dailyAttendance: {
        date: output.dailyAttendance.date.toString(),
        breakSecond: output.dailyAttendance.breakSecond,
      },
    });
  } catch (error) {
    console.error("Error in fixAttendLog API:", error);
    return NextResponse.json(
      { error: "Failed to fix attendance log" },
      { status: 500 },
    );
  }
}

const isYyyyMmDdHhMmSs = (
  datetime: string,
): datetime is YYYY_MM_DD_HH_MM_SS => {
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(datetime);
};

export async function GET(request: Request) {
  return NextResponse.json({ ok: false }, { status: 404 });
}
