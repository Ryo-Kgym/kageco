import { CalcWorkTimeUsecase } from "@/core/usecase/business/work/CalcWorkTimeUsecase";
import { TZDateTime, type YYYY_MM_DD, YYYYmmDD } from "@/util/date/date";
import { GetAttendanceOfMonthDocument } from "@v3/graphql/business/schema/query/v5/queryDailyAttendance.generated";

import { findUser } from "../../../persistence/browser/server/find-user";
import { execQuery } from "../../../persistence/database/server/execQuery";

export const fetchDailyAttendance = async (baseDate: YYYY_MM_DD) => {
  const { id, group } = await findUser();

  const usecase = new CalcWorkTimeUsecase({
    findBy: async (fromDate, toDate) => {
      const { data } = await execQuery(GetAttendanceOfMonthDocument, {
        fromDate: fromDate.toString(),
        toDate: toDate.toString(),
        yearMonth: fromDate.yyyy_mm,
        userId: id,
        groupId: group.id,
      });

      return {
        days:
          data.days.map((day) => ({
            id: day.id,
            date: new YYYYmmDD(day.date),
            startDatetime: new TZDateTime(day.startDatetime),
            endDatetime: new TZDateTime(day.endDatetime),
            breakSecond: day.breakSecond,
            logs:
              day.logs.map((log) => ({
                id: log.id,
                datetime: new TZDateTime(log.datetime),
                state: log.state,
                memo: log.memo,
              })) ?? [],
          })) ?? [],
        monthlyPlan: data.monthlyPlan?.[0] ?? null,
      };
    },
  });

  return await usecase.handle({ baseDate: new YYYYmmDD(baseDate) });
};
