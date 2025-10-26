import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { describe, expect, it } from "vitest";

import { DailyAttendance } from "./daily-attendance";

describe("DailyAttendance", () => {
  describe("replaceAndCreate", () => {
    const testLogs = [
      {
        id: "log1",
        state: "attend",
        datetime: new TZDateTime("2025-10-19T10:00:00Z"),
      },
      {
        id: "log2",
        state: "leave",
        datetime: new TZDateTime("2025-10-19T11:00:00Z"),
      },
      {
        id: "log3",
        state: "attend",
        datetime: new TZDateTime("2025-10-19T11:50:00Z"),
      },
      {
        id: "log4",
        state: "leave",
        datetime: new TZDateTime("2025-10-19T16:00:00Z"),
      },
    ] satisfies Parameters<
      typeof DailyAttendance.replaceAndCreate
    >[0]["dailyLogs"];

    const staticExpect = {
      date: new YYYYmmDD("2025-10-19"),
      dayOfWeek: "sun",
    } as const;

    it("正常系: log1を置き換える場合、startDatetime が置き換えられること", () => {
      const actual = DailyAttendance.replaceAndCreate({
        dailyLogs: testLogs,
        replace: {
          id: "log1",
          state: "attend",
          datetime: new TZDateTime("2025-10-19T09:00:00Z"),
        },
      });

      expect(actual).toEqual(
        new DailyAttendance({
          ...staticExpect,
          startDatetime: new TZDateTime("2025-10-19T09:00:00Z"),
          endDatetime: new TZDateTime("2025-10-19T16:00:00Z"),
          breakSecond: 50 * 60,
          workSecond: 7 * 3600 - 50 * 60,
        }),
      );
    });

    it("正常系: log2を置き換える場合、breakSecond が再計算されること", () => {
      const actual = DailyAttendance.replaceAndCreate({
        dailyLogs: testLogs,
        replace: {
          id: "log2",
          state: "leave",
          datetime: new TZDateTime("2025-10-19T11:20:00Z"),
        },
      });

      expect(actual).toEqual(
        new DailyAttendance({
          ...staticExpect,
          startDatetime: new TZDateTime("2025-10-19T10:00:00Z"),
          endDatetime: new TZDateTime("2025-10-19T16:00:00Z"),
          breakSecond: 30 * 60,
          workSecond: 6 * 3600 - 30 * 60,
        }),
      );
    });

    it("正常系: log3を置き換える場合、breakSecond が再計算されること", () => {
      const actual = DailyAttendance.replaceAndCreate({
        dailyLogs: testLogs,
        replace: {
          id: "log3",
          state: "attend",
          datetime: new TZDateTime("2025-10-19T12:00:00Z"),
        },
      });

      expect(actual).toEqual(
        new DailyAttendance({
          ...staticExpect,
          startDatetime: new TZDateTime("2025-10-19T10:00:00Z"),
          endDatetime: new TZDateTime("2025-10-19T16:00:00Z"),
          breakSecond: 60 * 60,
          workSecond: 6 * 3600 - 60 * 60,
        }),
      );
    });

    it("正常系: log4を置き換える場合、endDatetime が置き換えられること", () => {
      const actual = DailyAttendance.replaceAndCreate({
        dailyLogs: testLogs,
        replace: {
          id: "log4",
          state: "leave",
          datetime: new TZDateTime("2025-10-19T17:20:00Z"),
        },
      });

      expect(actual).toEqual(
        new DailyAttendance({
          ...staticExpect,
          startDatetime: new TZDateTime("2025-10-19T10:00:00Z"),
          endDatetime: new TZDateTime("2025-10-19T17:20:00Z"),
          breakSecond: 50 * 60,
          workSecond: 7 * 3600 + 20 * 60 - 50 * 60,
        }),
      );
    });

    it("異常系: 存在しないログを置き換えようとしたとき、エラーを投げる", () => {
      expect(() =>
        DailyAttendance.replaceAndCreate({
          dailyLogs: testLogs,
          replace: {
            id: "unknown",
            state: "leave",
            datetime: new TZDateTime("2025-10-19T17:20:00Z"),
          },
        }),
      ).toThrowError();
    });
  });
});
