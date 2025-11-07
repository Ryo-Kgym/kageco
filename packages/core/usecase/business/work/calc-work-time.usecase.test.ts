import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { MonthlyPlan } from "../../../domain/business/work/MonthlyPlan";
import { CalcWorkTimeUsecase } from "./calc-work-time.usecase";
import { CreateMonthlyPlanUsecase } from "./create-monthly-plan.usecase";

vi.mock("./create-monthly-plan.usecase");

describe("CalcWorkTimeUsecase", () => {
  // 各テスト前にモックをリセット
  beforeEach(() => {
    vi.resetAllMocks();

    // @ts-expect-error
    vi.mocked(CreateMonthlyPlanUsecase).mockImplementation(() => {
      return {
        handle: vi.fn().mockResolvedValue(
          new MonthlyPlan({
            businessDays: 20,
            workHoursLower: 140,
            workHoursUpper: 180,
          }),
        ),
      };
    });
  });

  test("正常系: 出勤データと月次計画が取得できる場合、正しい計算結果が返ること", async () => {
    // モックデータの準備
    const baseDate = new YYYYmmDD("2023-01-15");

    // FindAttendanceGatewayのモック
    const findAttendanceGatewayMock = {
      findBy: vi.fn().mockResolvedValue({
        days: [
          {
            id: "day1",
            date: new YYYYmmDD("2023-01-15"),
            startDatetime: new TZDateTime("2023-01-15T09:00:00Z"),
            endDatetime: new TZDateTime("2023-01-15T18:00:00Z"),
            breakSecond: 3600,
            logs: [
              {
                id: "log1",
                datetime: new TZDateTime("2023-01-15T09:00:00Z"),
                state: "attend",
                memo: null,
              },
              {
                id: "log2",
                datetime: new TZDateTime("2023-01-15T18:00:00Z"),
                state: "leave",
                memo: null,
              },
            ],
          },
        ],
        monthlyPlan: {
          id: "plan1",
          yearMonth: "2023-01",
          businessDays: 20,
          plannedWorkingHoursLower: 140,
          plannedWorkingHoursUpper: 180,
        },
      }),
    };

    // CreateMonthlyPlanGatewayのモック
    const createMonthlyPlanGatewayMock = {
      createMonthlyPlan: vi.fn(),
    };

    // テスト対象のインスタンス作成
    const usecase = new CalcWorkTimeUsecase(
      findAttendanceGatewayMock,
      createMonthlyPlanGatewayMock,
    );

    // 実行
    const result = await usecase.handle({ baseDate });

    // 検証
    // FindAttendanceGatewayが正しく呼ばれたことを確認
    expect(findAttendanceGatewayMock.findBy).toHaveBeenCalledTimes(1);

    // CreateMonthlyPlanUsecaseが正しく作成されたことを確認
    expect(CreateMonthlyPlanUsecase).toHaveBeenCalledWith(createMonthlyPlanGatewayMock);

    // 結果の検証
    expect(result).toEqual(
      expect.objectContaining({
        yearMonth: baseDate.yyyy_mm,
        lastState: "leave",
        totalWorkSecond: expect.any(Number),
        monthlyPlanned: {
          businessDays: 20,
          workHoursLower: 140,
          workHoursUpper: 180,
          workSecondLower: 504000, // 140 * 60 * 60
          workSecondUpper: 648000, // 180 * 60 * 60
        },
        remaining: expect.objectContaining({
          businessDays: expect.any(Number),
          workSecondLower: expect.any(Number),
          recommendedDailyWorkSecond: expect.any(Number),
        }),
      }),
    );

    // baseDateLogsの検証
    expect(result.baseDateLogs).toHaveLength(2);
    expect(result.baseDateLogs[0]).toEqual({
      id: "log1",
      state: "attend",
      datetime: new TZDateTime("2023-01-15T09:00:00Z"),
    });
    expect(result.baseDateLogs[1]).toEqual({
      id: "log2",
      state: "leave",
      datetime: new TZDateTime("2023-01-15T18:00:00Z"),
    });
  });

  test("月次計画がnullの場合、CreateMonthlyPlanUsecaseを使って新しい計画が作成されること", async () => {
    // モックデータの準備
    const baseDate = new YYYYmmDD("2023-01-15");

    // FindAttendanceGatewayのモック
    const findAttendanceGatewayMock = {
      findBy: vi.fn().mockResolvedValue({
        days: [],
        monthlyPlan: null,
      }),
    };

    // CreateMonthlyPlanGatewayのモック
    const createMonthlyPlanGatewayMock = {
      createMonthlyPlan: vi.fn(),
    };

    // テスト対象のインスタンス作成
    const usecase = new CalcWorkTimeUsecase(
      findAttendanceGatewayMock,
      createMonthlyPlanGatewayMock,
    );

    // 実行
    const result = await usecase.handle({ baseDate });

    // 検証
    // FindAttendanceGatewayが正しく呼ばれたことを確認
    expect(findAttendanceGatewayMock.findBy).toHaveBeenCalledTimes(1);

    // CreateMonthlyPlanUsecaseが正しく作成されたことを確認
    expect(CreateMonthlyPlanUsecase).toHaveBeenCalledWith(createMonthlyPlanGatewayMock);

    // 結果の検証
    expect(result.monthlyPlanned).toEqual({
      businessDays: 20,
      workHoursLower: 140,
      workHoursUpper: 180,
      workSecondLower: 504000,
      workSecondUpper: 648000,
    });
  });

  test("出勤データが空の場合、適切なデフォルト値が設定されること", async () => {
    // モックデータの準備
    const baseDate = new YYYYmmDD("2023-01-15");

    // FindAttendanceGatewayのモック
    const findAttendanceGatewayMock = {
      findBy: vi.fn().mockResolvedValue({
        days: [],
        monthlyPlan: {
          id: "plan1",
          yearMonth: "2023-01",
          businessDays: 20,
          plannedWorkingHoursLower: 140,
          plannedWorkingHoursUpper: 180,
        },
      }),
    };

    // CreateMonthlyPlanGatewayのモック
    const createMonthlyPlanGatewayMock = {
      createMonthlyPlan: vi.fn(),
    };

    // テスト対象のインスタンス作成
    const usecase = new CalcWorkTimeUsecase(
      findAttendanceGatewayMock,
      createMonthlyPlanGatewayMock,
    );

    // 実行
    const result = await usecase.handle({ baseDate });

    // 検証
    expect(result.baseDateLogs).toEqual([]);
    expect(result.lastState).toBe("leave"); // デフォルト値
    expect(result.totalWorkSecond).toBe(0); // 出勤データがないので0
  });
});
