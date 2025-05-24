import { describe, expect, test } from "vitest";
import { MonthlyPlan } from "./MonthlyPlan";

describe("MonthlyPlan", () => {
  describe("of", () => {
    test("occupancyRateが1.0のとき、正しい値で初期化されたインスタンスを返す", () => {
      const plan = MonthlyPlan.of(1.0);

      // ビジネス日数は20に固定
      expect(plan.businessDays).toBe(20);

      // 基本稼働時間: 8 * 20 * 1.0 = 160時間
      // バッファー: 20 * 1.0 = 20時間
      expect(plan.workHoursLower).toBe(140); // 160 - 20 = 140
      expect(plan.workHoursUpper).toBe(180); // 160 + 20 = 180
    });

    test("occupancyRateが0.5のとき、正しい値で初期化されたインスタンスを返す", () => {
      const plan = MonthlyPlan.of(0.5);

      expect(plan.businessDays).toBe(20);

      // 基本稼働時間: 8 * 20 * 0.5 = 80時間
      // バッファー: 20 * 0.5 = 10時間
      expect(plan.workHoursLower).toBe(70); // 80 - 10 = 70
      expect(plan.workHoursUpper).toBe(90); // 80 + 10 = 90
    });

    test("派生プロパティのworkSecondLowerとworkSecondUpperが正しく計算される", () => {
      const plan = MonthlyPlan.of(1.0);

      // 140時間と180時間を秒に変換
      expect(plan.workSecondLower).toBe(140 * 60 * 60);
      expect(plan.workSecondUpper).toBe(180 * 60 * 60);
    });

    test("極端なoccupancyRateの値でも正しく動作する", () => {
      // 非常に小さい値
      const smallPlan = MonthlyPlan.of(0.1);
      expect(smallPlan.businessDays).toBe(20);

      // 基本稼働時間: 8 * 20 * 0.1 = 16時間
      // バッファー: 20 * 0.1 = 2時間
      expect(smallPlan.workHoursLower).toBe(14); // 16 - 2 = 14
      expect(smallPlan.workHoursUpper).toBe(18); // 16 + 2 = 18

      // 大きな値
      const largePlan = MonthlyPlan.of(2.0);
      expect(largePlan.businessDays).toBe(20);

      // 基本稼働時間: 8 * 20 * 2.0 = 320時間
      // バッファー: 20 * 2.0 = 40時間
      expect(largePlan.workHoursLower).toBe(280); // 320 - 40 = 280
      expect(largePlan.workHoursUpper).toBe(360); // 320 + 40 = 360
    });
  });
});
