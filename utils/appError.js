class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    //This is confusing - J said you don't need to understand
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
