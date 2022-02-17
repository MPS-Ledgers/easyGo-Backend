const express = require("express");
const passport = require("passport");
require("dotenv").config();
const { checkBlackListedJWT } = require("../../middlewares/blackListJWT");
const freeCabs = require("../../models/freeCabsSchema.js");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  checkBlackListedJWT,
  async (req, res) => {
    try {
      const freeCab = await freeCabs.find();
      let requiredCabs = freeCab.filter((obj) => obj.type == req.body.type);
      if (requiredCabs.length.length == 0) res.status(200).send("no cabs available");
      else {
        let randomCab = Math.floor((Math.random() * 100) % requiredCabs.length);
        let otp = Math.floor(Math.random() * 10000);
        let currentCab = { ...requiredCabs[randomCab], otp };
        res.status(200).json(currentCab);
      }
    } catch (e) {
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
