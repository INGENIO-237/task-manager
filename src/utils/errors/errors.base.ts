export class BaseError extends Error {
  statusCode: number;
  isOperationalError: boolean;
  constructor(
    name: string,
    message: string,
    statusCode: number,
    isOperationalError: boolean
  ) {
    super(message);
    this.name = name;

    this.statusCode = statusCode;
    this.isOperationalError = isOperationalError;
    Error.captureStackTrace(this);
  }
}

class ApiError extends BaseError {
  constructor(message: string, statusCode: number) {
    super("ApiError", message, statusCode, true);
  }
}

export default ApiError;
