import { UsecaseException } from "./usecase.exception";

export class CreateFailureException extends UsecaseException {
  readonly target: string | undefined;

  constructor(target: string) {
    super({
      exceptionType: "CREATE_FAILURE",
      message: `Failed to create ${target}`,
    });
  }
}
