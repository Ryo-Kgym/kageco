import { TZDateTime } from "@/util/date/date";
import { describe, expect, it } from "vitest";
import { WorkTime } from "./work-time";

describe("WorkTime", () => {
  it("calcWorkSecond", () => {
    const actual = new WorkTime({
      startDatetime: new TZDateTime("2025-10-19T10:00:00Z"),
      endDatetime: new TZDateTime("2025-10-19T16:00:00Z"),
    }).calcWorkSecond(30 * 60);

    expect(actual).toEqual(6 * 3600 - 30 * 60);
  });
});
