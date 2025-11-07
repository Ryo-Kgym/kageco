import { MonthlyPlan } from "@/core/domain/business/work/MonthlyPlan";
import { CalcWorkTimeUsecase } from "@/core/usecase/business/work/calc-work-time.usecase";
import type { YYYY_MM_DD } from "@/util/date/date";
import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { generateId } from "@/util/generateId";
import { InsertMonthlyPlanDocument } from "@v3/graphql/business/schema/mutate/v5/mutateMonthlyPlan.generated";
import { GetAttendanceOfMonthDocument } from "@v3/graphql/business/schema/query/v5/queryDailyAttendance.generated";

import { execMutation } from "../../../../persistence/database/server/execMutation";
import { execQuery } from "../../../../persistence/database/server/execQuery";

/**
 * attendOrLeaveWork API用の勤怠データ取得関数
 * fetchDailyAttendanceと類似しているが、ユーザーIDとグループIDを引数で受け取る
 */
export const calcWorkTimeInvoker = async (
  baseDate: YYYY_MM_DD,
  userId: string,
  groupId: string,
) => {
  const usecase = new CalcWorkTimeUsecase(
    {
      findBy: async (fromDate, toDate) => {
        const { data } = await execQuery(GetAttendanceOfMonthDocument, {
          fromDate: fromDate.toString(),
          toDate: toDate.toString(),
          yearMonth: fromDate.yyyy_mm,
          userId: userId,
          groupId: groupId,
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
    },
    {
      async createMonthlyPlan(monthlyPlan) {
        const { data } = await execMutation(InsertMonthlyPlanDocument, {
          input: {
            id: generateId(),
            userId,
            yearMonth: new YYYYmmDD(baseDate).yyyy_mm,
            businessDays: monthlyPlan.businessDays,
            plannedWorkingHoursLower: monthlyPlan.workHoursLower,
            plannedWorkingHoursUpper: monthlyPlan.workHoursUpper,
          },
        });

        if (!data.insertBusinessMonthlyPlanOne) {
          return null;
        }

        return new MonthlyPlan({
          businessDays: data.insertBusinessMonthlyPlanOne.businessDays,
          workHoursLower: data.insertBusinessMonthlyPlanOne.plannedWorkingHoursLower,
          workHoursUpper: data.insertBusinessMonthlyPlanOne.plannedWorkingHoursUpper,
        });
      },
    },
  );

  return await usecase.handle({ baseDate: new YYYYmmDD(baseDate) });
};
