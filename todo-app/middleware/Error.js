export const ErrorHandler = (
  res,
  statusCode = 500,
  message = "Internal server Error"
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

export const assyncError = (passedFunc) => (req, res) => {
  return Promise.resolve(passedFunc(req, res)).catch((err) => {
    return ErrorHandler(res, 500, err.message);
  });
};
