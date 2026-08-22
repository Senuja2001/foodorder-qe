const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check whether Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Access token is required",
    });
  }

  // Expected format: Bearer <token>
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid token format",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Attach logged-in user information to request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateToken;