import { convertToYmd } from "@/core/function/date/convertToYmd";
import { CalcAttendanceLogUsecase } from "@/core/usecase/business/attend/CalcAttendanceLogUsecase";
import { TZDateTime, type YYYY_MM_DD, YYYYmmDD } from "@/type/date/date";
import {
  InsertDailyAttendanceDocument,
  InsertDailyAttendanceLogDocument,
  UpdateDailyAttendanceDocument,
} from "@v3/graphql/business/schema/mutate/v5/mutateDailyAttendance.generated";
import { NextResponse } from "next/server";

import { generateId } from "../../../../function/generateId";
import { execMutation } from "../../../../persistence/database/server/execMutation";
import { apiFetchAttendance } from "./api-fetch-attendance";
import { ApiFindLastAttendanceLogRepository } from "./api-find-last-attendance-log-repository";

export async function POST(request: Request) {
  try {
    // Parse request body to get userId and groupId
    const body = await request.json();
    const { userId, groupId } = body;

    // Validate required parameters
    if (!userId || !groupId) {
      return NextResponse.json(
        { error: "userId and groupId are required" },
        { status: 400 },
      );
    }

    // Current date and time
    const now = new Date();

    // Create custom repository with provided userId and groupId
    const repository = new ApiFindLastAttendanceLogRepository(userId, groupId);
    const usecase = new CalcAttendanceLogUsecase(repository);

    const currentDate = new YYYYmmDD(convertToYmd(now));
    const currentTZDatetime = TZDateTime.valueOf(now);

    const output = await usecase.handle({
      currentDate,
      currentTZDatetime,
    });

    if (output.dailyAttendanceId) {
      await execMutation(UpdateDailyAttendanceDocument, {
        id: output.dailyAttendanceId,
        set: {
          endDatetime: output.endDatetime.toString(),
          breakSecond: output.breakSecond,
        },
      });
      await execMutation(InsertDailyAttendanceLogDocument, {
        object: {
          id: generateId(),
          dailyAttendanceId: output.dailyAttendanceId,
          state: output.nextState,
          datetime: currentTZDatetime.toString(),
        },
      });
    } else {
      const dailyAttendanceId = generateId();
      await execMutation(InsertDailyAttendanceDocument, {
        object: {
          id: dailyAttendanceId,
          date: currentDate.toString(),
          startDatetime: currentTZDatetime.toString(),
          endDatetime: currentTZDatetime.toString(),
          breakSecond: 0,
          userId: userId,
          groupId: groupId,
        },
      });
      await execMutation(InsertDailyAttendanceLogDocument, {
        object: {
          id: generateId(),
          dailyAttendanceId,
          state: output.nextState,
          datetime: currentTZDatetime.toString(),
        },
      });
    }

    return NextResponse.json({
      nextState: output.nextState,
    });
  } catch (error) {
    console.error("Error in attendOrLeaveWork API:", error);
    return NextResponse.json(
      { error: "Failed to process attendance request" },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    // URLからクエリパラメータを取得
    const { searchParams } = new URL(request.url);
    const baseDate = searchParams.get("baseDate") as YYYY_MM_DD;

    // リクエストボディからuserIdとgroupIdを取得
    const body = await request.json();
    const { userId, groupId } = body;

    // 必須パラメータの検証
    if (!baseDate) {
      return NextResponse.json(
        { error: "baseDate is required" },
        { status: 400 },
      );
    }

    if (!userId || !groupId) {
      return NextResponse.json(
        { error: "userId and groupId are required" },
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
    const attendanceData = await apiFetchAttendance(baseDate, userId, groupId);

    // レスポンスを返す
    return NextResponse.json(attendanceData);
  } catch (error) {
    console.error("Error in attendOrLeaveWork GET API:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance data" },
      { status: 500 },
    );
  }
}
