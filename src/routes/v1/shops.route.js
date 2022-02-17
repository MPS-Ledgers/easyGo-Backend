const express = require("express");
const passport = require("passport");
const { route } = require("../../app.js");
require("dotenv").config();
const { checkBlackListedJWT } = require("../../middlewares/blackListJWT");
const Shop = require("../../models/shopSchema.js");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkBlackListedJWT,
  async (req, res) => {
    try {
      const shops = await Shop.find();
      res.status(200).json(shops);
    } catch (e) {
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
