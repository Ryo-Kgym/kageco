/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import { convertToYmd } from "./convertToYmd";

describe("convertToYmd function", () => {
  it("日本時間でYYYY-MM-DD形式に変換されること", () => {
    // 2023-03-03 in UTC
    const testDate = new Date(Date.UTC(2023, 2, 3));
    const result = convertToYmd(testDate);
    // Should be 2023-03-03 in Japan (UTC+9)
    expect(result).toBe("2023-03-03");
  });

  it("日本時間で日付が変わる場合、正しく変換されること", () => {
    // 2023-03-03 15:00:00 UTC = 2023-03-04 00:00:00 JST
    const testDate = new Date(Date.UTC(2023, 2, 3, 15));
    const result = convertToYmd(testDate);
    // Should be 2023-03-04 in Japan (UTC+9)
    expect(result).toBe("2023-03-04");
  });

  it("月と日が1桁の場合、0埋めされること", () => {
    // 2023-01-01 in UTC
    const testDate = new Date(Date.UTC(2023, 0, 1));
    const result = convertToYmd(testDate);
    // Should be 2023-01-01 in Japan (UTC+9)
    expect(result).toBe("2023-01-01");
  });

  it("月末日の場合、正しく変換されること", () => {
    // 2023-12-31 in UTC
    const testDate = new Date(Date.UTC(2023, 11, 31));
    const result = convertToYmd(testDate);
    // Should be 2023-12-31 in Japan (UTC+9)
    expect(result).toBe("2023-12-31");
  });
});
