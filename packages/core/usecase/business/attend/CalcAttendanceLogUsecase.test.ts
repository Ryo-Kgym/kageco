import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { describe, expect, test, vi } from "vitest";

import { CalcAttendanceLogUsecase } from "./CalcAttendanceLogUsecase";

vi.mock("../../gateway/attend/AttendanceGateway");

describe("CalcAttendanceLogUsecase", () => {
  test("typeが出勤だった場合、退勤にする", () => {
    const usecase = new CalcAttendanceLogUsecase({
      findBy: () =>
        Promise.resolve({
          dailyAttendanceId: "1",
          datetime: new YYYYmmDD("2021-01-01"),
          state: "attend",
          startDatetime: new TZDateTime("2021-01-01T09:00:00Z"),
          endDatetime: new TZDateTime("2021-01-01T10:00:00Z"),
          breakSecond: 3600,
        }),
    });

    return usecase
      .handle({
        currentDate: new YYYYmmDD("2021-01-01"),
        currentTZDatetime: new TZDateTime("2021-01-01T11:00:00Z"),
      })
      .then((output) => {
        expect(output).toEqual({
          dailyAttendanceId: "1",
          nextState: "leave",
          startDatetime: new TZDateTime("2021-01-01T09:00:00Z"),
          endDatetime: new TZDateTime("2021-01-01T11:00:00Z"),
          breakSecond: 3600,
        });
      });
  });

  test("typeが退勤だった場合、出勤にする", () => {
    const usecase = new CalcAttendanceLogUsecase({
      findBy: () =>
        Promise.resolve({
          dailyAttendanceId: "1",
          datetime: new YYYYmmDD("2021-01-01T10:00:00Z"),
          state: "leave",
          startDatetime: new TZDateTime("2021-01-01T09:00:00Z"),
          endDatetime: new TZDateTime("2021-01-01T10:00:00Z"),
          breakSecond: 10,
        }),
    });

    return usecase
      .handle({
        currentDate: new YYYYmmDD("2021-01-01"),
        currentTZDatetime: new TZDateTime("2021-01-01T11:00:00Z"),
      })
      .then((output) => {
        expect(output).toEqual({
          dailyAttendanceId: "1",
          nextState: "attend",
          startDatetime: new TZDateTime("2021-01-01T09:00:00Z"),
          endDatetime: new TZDateTime("2021-01-01T10:00:00Z"),
          breakSecond: 3610,
        });
      });
  });
});
