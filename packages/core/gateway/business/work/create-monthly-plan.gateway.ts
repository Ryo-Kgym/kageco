import type { MonthlyPlan } from "../../../domain/business/work/MonthlyPlan";

export interface CreateMonthlyPlanGateway {
  createMonthlyPlan(
    monthlyPlan: Pick<MonthlyPlan, "businessDays" | "workHoursLower" | "workHoursUpper">,
  ): Promise<MonthlyPlan | null>;
}
