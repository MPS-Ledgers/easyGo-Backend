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
      if (req.body.type == undefined)
        throw new Error("Please send the required fields in the body");
      const shops = await Shop.find({ type: req.body.type });
      res.status(200).json(shops);
    } catch (e) {
      res.status(500).send("server error");
    }
  }
);

router.post(
  "/rental",
  passport.authenticate("jwt", { session: false }),
  checkBlackListedJWT,
  async (req, res) => {
    try {
      let currentShop = await Shop.findById({ _id: req.body.id });
      let currentCount = currentShop["availability"][0][req.body.type];
      const shop = await Shop.updateOne(
        { _id: req.body.id },
        { $set: { [`availability.${req.body.type}`]: currentCount - 1 } }
      );
      // console.log(
      //   req.body.type,
      //   currentShop["availability"][0],
      //   Object.keys(currentShop["availability"][0].toJSON()),
      //   currentShop["availability"][0].dmax,
      //   currentCount,
      //   shop
      // );
      res.send("done");
    } catch (e) {
      res.status(500).send(e);
    }
  }
);

module.exports = router;
