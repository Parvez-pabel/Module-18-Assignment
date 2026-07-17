// errorHandler.js
export const errorHandler = (err, req, res, next) => {
  const statusCode =
    err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  const message = err.message || "Internal Server Error";

  let cleanMessage = message;
  let finalStatusCode = statusCode;
  if (res.headersSent) {
    return next(err);
  }

  if (err.name === "CastError") {
    cleanMessage = `Resource not found. Invalid ID format.`;
    finalStatusCode = 400;
  }

  if (err.name === "ValidationError") {
    cleanMessage = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    finalStatusCode = 400;
  }

  if (err.code === 11000) {
    cleanMessage = `Duplicate field value entered.`;
    finalStatusCode = 400;
  }

  res.status(finalStatusCode).json({
    success: false,
    statusCode: finalStatusCode,
    message: cleanMessage,
  });
};
