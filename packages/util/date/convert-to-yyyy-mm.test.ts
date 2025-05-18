/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import { convertToYyyyMm } from "./convert-to-yyyy-mm";

describe("convertToYyyyMm function", () => {
  it("should correctly convert Date object to yyyy-mm format", () => {
    const testDate = new Date(2023, 2, 3);
    const result = convertToYyyyMm(testDate);
    expect(result).toBe("2023-03");
  });

  it("should pad single digit month with 0", () => {
    const testDate = new Date("2023-01-01"); // January month is 0 in Date object
    const result = convertToYyyyMm(testDate);
    expect(result).toBe("2023-01");
  });

  it("should not pad double digit month with 0", () => {
    const testDate = new Date(2023, 10, 1); // November month is 10 in Date object
    const result = convertToYyyyMm(testDate);
    expect(result).toBe("2023-11");
  });
});
