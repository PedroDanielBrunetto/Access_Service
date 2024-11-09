class AppError {
  public readonly message: string | any;
  public readonly statusCode: number;

  constructor(message: string | any, statusCode = 400) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
