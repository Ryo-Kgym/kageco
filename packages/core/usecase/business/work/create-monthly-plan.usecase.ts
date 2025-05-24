import { MonthlyPlan } from "../../../domain/business/work/MonthlyPlan";
import { CreateFailureException } from "../../../exception/create-failure.exception";
import type { CreateMonthlyPlanGateway } from "../../../gateway/business/work/create-monthly-plan.gateway";
import type { BusinessUsecase } from "../BusinessUsecase";

/**
 * 月次計画生成のユースケース
 */
export class CreateMonthlyPlanUsecase
  implements BusinessUsecase<CreateMonthlyPlanInput, MonthlyPlan>
{
  constructor(private createMonthlyPlanGateway: CreateMonthlyPlanGateway) {}

  async handle(input: CreateMonthlyPlanInput): Promise<MonthlyPlan> {
    const plan = input.monthlyPlan
      ? new MonthlyPlan({
          businessDays: input.monthlyPlan.businessDays,
          workHoursLower: input.monthlyPlan.plannedWorkingHoursLower,
          workHoursUpper: input.monthlyPlan.plannedWorkingHoursUpper,
        })
      : await this.createMonthlyPlanGateway.createMonthlyPlan(
          MonthlyPlan.of(1.0),
        );

    if (!plan) {
      throw new CreateFailureException("monthly-plan");
    }

    return plan;
  }
}

/**
 * 月次計画生成の入力
 */
export type CreateMonthlyPlanInput = {
  monthlyPlan: {
    id: string;
    yearMonth: string;
    businessDays: number;
    plannedWorkingHoursLower: number;
    plannedWorkingHoursUpper: number;
  } | null;
};
