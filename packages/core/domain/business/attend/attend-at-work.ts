import type { TZDateTime } from "@/util/date/date";

export class AttendAtWork {
  private readonly lastLeaveTime: TZDateTime;

  constructor({ lastLeaveTime }: { lastLeaveTime: TZDateTime }) {
    this.lastLeaveTime = lastLeaveTime;
  }

  attend(attendTime: TZDateTime) {
    const breakMilliSecond = attendTime.getTimeSecond() - this.lastLeaveTime.getTimeSecond();

    return {
      breakSecond: Math.floor(breakMilliSecond),
    };
  }
}
