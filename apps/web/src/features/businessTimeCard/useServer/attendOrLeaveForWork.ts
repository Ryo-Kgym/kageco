"use server";

import { convertToYmd } from "@/core/function/date/convertToYmd";
import { CalcAttendanceLogUsecase } from "@/core/usecase/business/attend/CalcAttendanceLogUsecase";
import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import {
  InsertDailyAttendanceDocument,
  InsertDailyAttendanceLogDocument,
  UpdateDailyAttendanceDocument,
} from "@v3/graphql/business/schema/mutate/v5/mutateDailyAttendance.generated";

import { generateId } from "../../../function/generateId";
import { findUser } from "../../../persistence/browser/server/find-user";
import { execMutation } from "../../../persistence/database/server/execMutation";
import { FindLastAttendanceLogRepository } from "../repository/FindLastAttendanceLogRepository";

export const attendOrLeaveForWork = async (now: Date) => {
  const { id, group } = await findUser();

  const usecase = new CalcAttendanceLogUsecase(
    new FindLastAttendanceLogRepository(),
  );

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
        userId: id,
        groupId: group.id,
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

  return {
    nextState: output.nextState,
  };
};
