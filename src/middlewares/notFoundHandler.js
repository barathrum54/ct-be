const notFoundHandler = (req, res, next) => {
  const message = `Resource not found: ${req.originalUrl}`;
  res.status(404).json({
    error: {
      status: 404,
      message: message,
    },
  });
};

export default notFoundHandler;
