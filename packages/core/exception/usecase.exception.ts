export abstract class UsecaseException extends Error {
  readonly exceptionType: ExceptionType;

  constructor(params: { exceptionType: ExceptionType; message: string }) {
    super(params.message);
    this.exceptionType = params.exceptionType;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

type ExceptionType = "CREATE_FAILURE";
