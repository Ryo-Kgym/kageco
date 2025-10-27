import { describe, expect, it, vi } from "vitest";

import { TZDateTime, YYYYmmDD } from "@/util/date/date";
import { ModifiedDateTimeIsAfterNextLogException } from "../../../exception/business/attend/modified-date-time-is-after-next-log.exception";
import { ModifiedDateTimeIsBeforePreviousLogException } from "../../../exception/business/attend/modified-date-time-is-before-previous-log.exception";
import type { UpdateAttendanceLogGateway } from "../../../gateway/business/attend/update-attendance-log.gateway";
import { FixAttendLogUsecase } from "./fix-attend-log.usecase";

const dailyLogs = [
  {
    id: "1",
    state: "attend" as const,
    memo: "memo",
    datetime: new TZDateTime("2025-01-01T10:00:00Z"),
  },
  {
    id: "2",
    state: "leave" as const,
    memo: "memo",
    datetime: new TZDateTime("2025-01-01T12:00:00Z"),
  },
  {
    id: "3",
    state: "attend" as const,
    memo: "memo",
    datetime: new TZDateTime("2025-01-01T13:00:00Z"),
  },
  {
    id: "4",
    state: "leave" as const,
    memo: "memo",
    datetime: new TZDateTime("2025-01-01T17:00:00Z"),
  },
];

describe("FixAttendLogUsecase", () => {
  describe("handle", () => {
    it("正常系: update gatewayへ期待する値が渡されること", async () => {
      const updateMock = vi.fn();

      const usecase = new FixAttendLogUsecase(
        {
          findByLogId: () =>
            Promise.resolve({
              log: {
                id: "2",
                state: "leave",
                memo: "memo",
                datetime: new TZDateTime("2025-01-01T12:00:00Z"),
              },
              dailyLogs,
              attendance: {
                id: "attendanceId",
                date: new YYYYmmDD("2025-01-01"),
                breakSecond: 3600,
                startDatetime: new TZDateTime("2025-01-01T10:00:00Z"),
                endDatetime: new TZDateTime("2025-01-01T17:00:00Z"),
              },
            }),
        },
        { update: updateMock } satisfies UpdateAttendanceLogGateway,
      );

      const actual = await usecase.handle({
        attendanceLogId: "2",
        datetime: new TZDateTime("2025-01-01T12:10:00Z"),
        memo: "修正後メモ",
      });

      expect(updateMock).toHaveBeenCalledWith({
        log: {
          id: "2",
          memo: "修正後メモ",
          datetime: new TZDateTime("2025-01-01T12:10:00Z"),
        },
        attendance: {
          id: "attendanceId",
          breakSecond: 3000,
          startDatetime: new TZDateTime("2025-01-01T10:00:00Z"),
          endDatetime: new TZDateTime("2025-01-01T17:00:00Z"),
        },
      });

      expect(actual).toEqual<typeof actual>({
        dailyAttendance: {
          date: new YYYYmmDD("2025-01-01"),
          breakSecond: 3000,
        },
      });
    });

    it("異常系: 修正後の日時が前のログよりも過去日時の場合、エラーを投げる。", async () => {
      const usecase = new FixAttendLogUsecase(
        {
          findByLogId: () =>
            Promise.resolve({
              log: {
                id: "2",
                state: "leave",
                memo: "memo",
                datetime: new TZDateTime("2025-01-01T12:00:00Z"),
              },
              dailyLogs,
              attendance: {
                id: "attendanceId",
                date: new YYYYmmDD("2025-01-01"),
                breakSecond: 3600,
                startDatetime: new TZDateTime("2025-01-01T10:00:00Z"),
                endDatetime: new TZDateTime("2025-01-01T17:00:00Z"),
              },
            }),
        },
        { update: vi.fn() },
      );

      expect(() =>
        usecase.handle({
          attendanceLogId: "2",
          datetime: new TZDateTime("2025-01-01T09:10:00Z"),
          memo: "修正後メモ",
        }),
      ).rejects.toThrowError(ModifiedDateTimeIsBeforePreviousLogException);
    });

    it("異常系: 修正後の日時が次のログよりも未来日時の場合、エラーを投げる。", async () => {
      const usecase = new FixAttendLogUsecase(
        {
          findByLogId: () =>
            Promise.resolve({
              log: {
                id: "2",
                state: "leave",
                memo: "memo",
                datetime: new TZDateTime("2025-01-01T12:00:00Z"),
              },
              dailyLogs,
              attendance: {
                id: "attendanceId",
                date: new YYYYmmDD("2025-01-01"),
                breakSecond: 3600,
                startDatetime: new TZDateTime("2025-01-01T10:00:00Z"),
                endDatetime: new TZDateTime("2025-01-01T17:00:00Z"),
              },
            }),
        },
        { update: vi.fn() },
      );

      expect(() =>
        usecase.handle({
          attendanceLogId: "2",
          datetime: new TZDateTime("2025-01-01T13:10:00Z"),
          memo: "修正後メモ",
        }),
      ).rejects.toThrowError(ModifiedDateTimeIsAfterNextLogException);
    });
  });
});
