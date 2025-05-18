import type { TZDateTime } from "@/util/date/date";

export class LeaveWork {
  private readonly lastAttendedTime: TZDateTime;

  constructor({ lastAttendedTime }: { lastAttendedTime: TZDateTime }) {
    this.lastAttendedTime = lastAttendedTime;
  }

  leave(leaveTime: TZDateTime) {
    return {
      startDatetime: this.lastAttendedTime,
      endDatetime: leaveTime,
    };
  }
}
