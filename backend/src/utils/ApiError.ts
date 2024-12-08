class ApiError extends Error {
  statusCode: number;
  data: any;
  success: boolean;
  errors: Error[];

  constructor(
    statusCode: number,
    message = "Something went wrong",
    data: any = null,
    errors = [],
    stack = ""
  ) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
