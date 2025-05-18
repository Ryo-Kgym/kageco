import { TZDateTime } from "@/util/date/date";
import { describe, test } from "vitest";

import { LeaveWork } from "./LeaveWork";

describe("LeaveWork", () => {
  test("leave", () => {
    const actual = new LeaveWork({
      lastAttendedTime: new TZDateTime("2025-01-25T09:10:01"),
    }).leave(new TZDateTime("2025-01-25T10:10:01"));

    expect(actual).toEqual({
      startDatetime: new TZDateTime("2025-01-25T09:10:01"),
      endDatetime: new TZDateTime("2025-01-25T10:10:01"),
    });
  });
});
