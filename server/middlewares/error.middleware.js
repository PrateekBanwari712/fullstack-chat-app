export const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // Log the error details for debugging
  console.error("Error details:", {
    message: err.message,
    statusCode: err.statusCode,
  });

  res.status(err.statusCode).json({
    success: false,
    errMessage: err.message || "Internal Server Error",
  });
};
