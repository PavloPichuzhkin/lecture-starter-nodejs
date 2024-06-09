const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.notFound) {
    res.status(404).json({ error: true, message: res.message });
  }

  if (res.badRequest) {
    res.status(400).json({ error: true, message: res.message });
  }

  res.status(200).json(res.data);
  next();
};

export { responseMiddleware };
