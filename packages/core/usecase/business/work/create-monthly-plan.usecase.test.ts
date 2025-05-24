import { describe, expect, test, vi } from "vitest";

import { MonthlyPlan } from "../../../domain/business/work/MonthlyPlan";
import { CreateFailureException } from "../../../exception/create-failure.exception";
import { CreateMonthlyPlanUsecase } from "./create-monthly-plan.usecase";

describe("CreateMonthlyPlanUsecase", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("monthlyPlanが提供された場合、入力から新しいMonthlyPlanを作成すること", async () => {
    const createMonthlyPlanMock = vi.fn();

    const usecase = new CreateMonthlyPlanUsecase({
      createMonthlyPlan: createMonthlyPlanMock,
    });

    const input = {
      monthlyPlan: {
        id: "test-id",
        yearMonth: "2023-01",
        businessDays: 22,
        plannedWorkingHoursLower: 150,
        plannedWorkingHoursUpper: 180,
      },
    };

    const result = await usecase.handle(input);

    // gatewayが呼ばれていないことを確認
    expect(createMonthlyPlanMock).not.toHaveBeenCalled();

    // 結果が期待通りであることを確認
    expect(result).toBeInstanceOf(MonthlyPlan);
    expect(result.businessDays).toBe(22);
    expect(result.workHoursLower).toBe(150);
    expect(result.workHoursUpper).toBe(180);
  });

  test("monthlyPlanがnullの場合、gatewayを使用して新しいMonthlyPlanを作成すること", async () => {
    // モックの戻り値を設定
    const mockMonthlyPlan = new MonthlyPlan({
      businessDays: 20,
      workHoursLower: 140,
      workHoursUpper: 180,
    });

    const createMonthlyPlanMock = vi.fn().mockResolvedValue(mockMonthlyPlan);

    const usecase = new CreateMonthlyPlanUsecase({
      createMonthlyPlan: createMonthlyPlanMock,
    });

    const input = {
      monthlyPlan: null,
    };

    const result = await usecase.handle(input);

    // gatewayが正しいパラメータで呼ばれたことを確認
    expect(createMonthlyPlanMock).toHaveBeenCalledTimes(1);

    // MonthlyPlan.of(1.0)が渡されたことを確認
    const expectedMonthlyPlan = MonthlyPlan.of(1.0);
    expect(createMonthlyPlanMock).toHaveBeenCalledWith(
      expect.objectContaining({
        businessDays: expectedMonthlyPlan.businessDays,
        workHoursLower: expectedMonthlyPlan.workHoursLower,
        workHoursUpper: expectedMonthlyPlan.workHoursUpper,
      }),
    );

    // 結果が期待通りであることを確認
    expect(result).toBe(mockMonthlyPlan);
  });

  test("gatewayがnullを返す場合、CreateFailureExceptionがスローされること", async () => {
    const usecase = new CreateMonthlyPlanUsecase({
      createMonthlyPlan: vi.fn().mockResolvedValue(null),
    });

    const input = {
      monthlyPlan: null,
    };

    // エラーがスローされることを確認
    await expect(usecase.handle(input)).rejects.toThrow(CreateFailureException);
    await expect(usecase.handle(input)).rejects.toThrow("monthly-plan");
  });
});
