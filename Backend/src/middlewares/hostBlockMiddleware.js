const hostBlockMiddleware = (req, res, next) => {
  if (req.user.hostStatus === "blocked") {
    return res.status(403).json({ message: "Host blocked by admin" });
  }
  next();
};

module.exports = hostBlockMiddleware;
