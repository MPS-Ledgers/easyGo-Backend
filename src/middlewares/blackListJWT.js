require("dotenv").config();
const redis = require("../config/redis.js");

const checkBlackListedJWT = async (req, res, next) => {
  const userId = req.user._id.toString();
  const token = req.headers.authorization.split(" ")[1];

  const fromBlackListedJWTs = await redis.get(userId);
  if (fromBlackListedJWTs === token) {
    res.status(401).json({ success: false, message: "unauthorized JWT" });
  } else {
    next();
  }
};

module.exports = { checkBlackListedJWT };
