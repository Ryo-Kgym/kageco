import { convertToYmd } from "@/core/function/date/convertToYmd";
import { CalcAttendanceLogUsecase } from "@/core/usecase/business/attend/CalcAttendanceLogUsecase";
import { TZDateTime, YYYYmmDD } from "@/type/date/date";
import {
  InsertDailyAttendanceDocument,
  InsertDailyAttendanceLogDocument,
  UpdateDailyAttendanceDocument,
} from "@v3/graphql/business/schema/mutate/v5/mutateDailyAttendance.generated";
import { NextResponse } from "next/server";

import { generateId } from "../../../../function/generateId";
import { execMutation } from "../../../../persistence/database/server/execMutation";
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
