/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import { getThisYearFirstDate, getThisYearLastDate } from "./this-year";

describe("this-year functions", () => {
  // モック化した日付を使用するためのセットアップ
  let originalDate: DateConstructor;

  beforeEach(() => {
    originalDate = global.Date;
    const mockDate = new Date(2023, 0, 15); // 2023年1月15日

    // Date コンストラクタをモック化
    global.Date = class extends Date {
      constructor() {
        super();
        // biome-ignore lint/correctness/noConstructorReturn: <explanation>
        return mockDate;
      }
    } as DateConstructor;
  });

  afterEach(() => {
    // テスト後に元の Date コンストラクタを復元
    global.Date = originalDate;
  });

  describe("getThisYearFirstDate", () => {
    it("今年の最初の日付（1月1日）を返すこと", () => {
      const result = getThisYearFirstDate();
      expect(result).toBe("2023-01-01");
    });
  });

  describe("getThisYearLastDate", () => {
    it("今年の最後の日付（12月31日）を返すこと", () => {
      const result = getThisYearLastDate();
      expect(result).toBe("2023-12-31");
    });
  });
});
