/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import { convertToHms } from "./convertToHms";

describe("convertToHms function", () => {
  it("日本時間でHH:mm:ss形式に変換されること", () => {
    // 12:34:56 in UTC
    const testDate = new Date(Date.UTC(2023, 2, 3, 12, 34, 56));
    const result = convertToHms(testDate);
    // Should be 21:34:56 in Japan (UTC+9)
    expect(result).toBe("21:34:56");
  });

  it("日本時間で日付が変わる場合、正しく変換されること", () => {
    // 2023-03-03 20:00:00 UTC = 2023-03-04 05:00:00 JST
    const testDate = new Date(Date.UTC(2023, 2, 3, 20, 0, 0));
    const result = convertToHms(testDate);
    // Should be 05:00:00 in Japan (UTC+9)
    expect(result).toBe("05:00:00");
  });

  it("時、分、秒が1桁の場合、0埋めされること", () => {
    // 01:02:03 in UTC
    const testDate = new Date(Date.UTC(2023, 0, 1, 1, 2, 3));
    const result = convertToHms(testDate);
    // Should be 10:02:03 in Japan (UTC+9)
    expect(result).toBe("10:02:03");
  });

  it("undefinedが渡された場合、代替値が返されること", () => {
    const result = convertToHms(undefined);
    expect(result).toBe("");
  });

  it("undefinedが渡され、代替値が指定された場合、指定された代替値が返されること", () => {
    const result = convertToHms(undefined, "N/A");
    expect(result).toBe("N/A");
  });
});