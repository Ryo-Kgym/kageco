import type { TZDateTime } from "@/util/date/date";

export interface UpdateAttendanceLogGateway {
  update: (params: {
    log: {
      id: string;
      memo: string | null;
      datetime: TZDateTime;
    };
    attendance: {
      id: string;
      breakSecond: number;
      startDatetime: TZDateTime;
      endDatetime: TZDateTime;
    };
  }) => Promise<{ count: number }>;
}
