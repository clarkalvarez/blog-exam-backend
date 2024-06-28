require("dotenv").config();
const jwt = require("jsonwebtoken");
const accessKey = process.env.ACCESS_TOKEN_SECRET;

const authorizeAdmin = (req, res, next) => {
  // if (req.userRole.name !== "Admin") {
  //   return res.status(403).json({ error: "Unauthorized" });
  // }
  next();
};

const authenticate = (req, res, next) => {
  const headerToken = req.headers["authorization"];
  const token = headerToken && headerToken.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, accessKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Failed to authenticate token" });
    }

    req.userId = decoded.userId;
    next();
  });
};

module.exports = { authorizeAdmin, authenticate };
