export interface UpdateAttendanceLogGateway {
  update: (params: {
    log: {
      id: string;
      memo: string | null;
      datetime: Date;
    };
    attendance: {
      id: string;
      breakSecond: number;
      startDatetime: Date;
      endDatetime: Date;
    };
  }) => Promise<{ count: number }>;
}
