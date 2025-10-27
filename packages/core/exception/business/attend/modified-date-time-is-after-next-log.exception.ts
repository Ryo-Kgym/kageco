import { UsecaseException } from "../../usecase.exception";

export class ModifiedDateTimeIsAfterNextLogException extends UsecaseException {
  constructor() {
    super({
      exceptionType: "INVALID_VALUE",
      message:
        "修正後の日時が後のログよりも未来の日時です。過去の日時になるように指定してください。",
    });
  }
}
