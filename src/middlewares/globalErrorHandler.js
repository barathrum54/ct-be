
export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || err.message || 'Internal Server Error';
  // const stack = err.statusCode === 500 ? err.stack : undefined;
  res.status(statusCode).json({
    status: statusCode,
    message: message,
  });
};
export default globalErrorHandler;
