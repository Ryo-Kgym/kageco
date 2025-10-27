import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { describe, expect, test } from "vitest";

import { DailyAttendance } from "../../../domain/business/attend/daily-attendance";
import { mergeDailyList } from "./merge-daily-list";

describe("mergeDailyList", () => {
  test("日付リストに対応する出勤データがない場合、未定義の値を持つDayAttendanceが返ること", () => {
    // Arrange
    const monthlyList = [new YYYYmmDD("2023-01-01")];
    const days: {
      id: string;
      date: YYYYmmDD;
      startDatetime: TZDateTime;
      endDatetime: TZDateTime;
      breakSecond: number;
    }[] = [];

    // Act
    const result = mergeDailyList(monthlyList, days);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      new DailyAttendance({
        date: new YYYYmmDD("2023-01-01"),
        dayOfWeek: "sun",
        startDatetime: undefined,
        endDatetime: undefined,
        breakSecond: undefined,
        workSecond: undefined,
      }),
    );
  });

  test("日付リストに対応する出勤データがある場合、その値を持つDayAttendanceが返ること", () => {
    // Arrange
    const monthlyList = [new YYYYmmDD("2023-01-02")];
    const days = [
      {
        id: "1",
        date: new YYYYmmDD("2023-01-02"),
        startDatetime: new TZDateTime("2023-01-02T09:00:00Z"),
        endDatetime: new TZDateTime("2023-01-02T18:00:00Z"),
        breakSecond: 3600,
      },
    ];

    // Act
    const result = mergeDailyList(monthlyList, days);

    // Assert
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(
      new DailyAttendance({
        date: new YYYYmmDD("2023-01-02"),
        dayOfWeek: "mon",
        startDatetime: new TZDateTime("2023-01-02T09:00:00Z"),
        endDatetime: new TZDateTime("2023-01-02T18:00:00Z"),
        breakSecond: 3600,
        workSecond: 28800,
      }),
    );
  });

  test("複数の日付リストに対して、出勤データがある日とない日が混在する場合、適切なDayAttendanceのリストが返ること", () => {
    // Arrange
    const monthlyList = [
      new YYYYmmDD("2023-01-03"),
      new YYYYmmDD("2023-01-04"),
      new YYYYmmDD("2023-01-05"),
    ];
    const days = [
      {
        id: "1",
        date: new YYYYmmDD("2023-01-03"),
        startDatetime: new TZDateTime("2023-01-03T09:00:00Z"),
        endDatetime: new TZDateTime("2023-01-03T18:00:00Z"),
        breakSecond: 3600,
      },
      {
        id: "2",
        date: new YYYYmmDD("2023-01-05"),
        startDatetime: new TZDateTime("2023-01-05T10:00:00Z"),
        endDatetime: new TZDateTime("2023-01-05T19:00:00Z"),
        breakSecond: 1800,
      },
    ];

    // Act
    const result = mergeDailyList(monthlyList, days);

    // Assert
    expect(result).toHaveLength(3);

    // 2023-01-03 (出勤データあり)
    expect(result[0]).toEqual(
      new DailyAttendance({
        date: new YYYYmmDD("2023-01-03"),
        dayOfWeek: "tue",
        startDatetime: new TZDateTime("2023-01-03T09:00:00Z"),
        endDatetime: new TZDateTime("2023-01-03T18:00:00Z"),
        breakSecond: 3600,
        workSecond: 28800, // 9時間 - 1時間 = 8時間 = 28800秒
      }),
    );

    // 2023-01-04 (出勤データなし)
    expect(result[1]).toEqual(
      new DailyAttendance({
        date: new YYYYmmDD("2023-01-04"),
        dayOfWeek: "wed",
        startDatetime: undefined,
        endDatetime: undefined,
        breakSecond: undefined,
        workSecond: undefined,
      }),
    );

    // 2023-01-05 (出勤データあり)
    expect(result[2]).toEqual(
      new DailyAttendance({
        date: new YYYYmmDD("2023-01-05"),
        dayOfWeek: "thu",
        startDatetime: new TZDateTime("2023-01-05T10:00:00Z"),
        endDatetime: new TZDateTime("2023-01-05T19:00:00Z"),
        breakSecond: 1800,
        workSecond: 30600, // 9時間 - 30分 = 8時間30分 = 30600秒
      }),
    );
  });
});
