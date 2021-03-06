const express = require("express");
const passport = require("passport");
require("dotenv").config();
const redis = require("../../config/redis.js");
const { checkBlackListedJWT } = require("../../middlewares/blackListJWT");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkBlackListedJWT,
  async (req, res) => {
    res.status(200).send("done");
  }
);

module.exports = router;
