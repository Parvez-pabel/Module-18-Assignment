// pageNotFound.js
export const notFoundHandler = (req, res, next) => {
  const error = new Error(`API Endpoint Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};
