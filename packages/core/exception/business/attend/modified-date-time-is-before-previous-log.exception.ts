import { UsecaseException } from "../../usecase.exception";

export class ModifiedDateTimeIsBeforePreviousLogException extends UsecaseException {
  constructor() {
    super({
      exceptionType: "INVALID_VALUE",
      message:
        "修正後の日時が前のログよりも過去の日時です。未来の日時になるように指定してください。",
    });
  }
}
