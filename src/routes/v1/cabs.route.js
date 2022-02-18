const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
const { checkBlackListedJWT } = require("../../middlewares/blackListJWT");
const freeCabs = require("../../models/freeCabsSchema.js");
const Shop = require("../../models/shopSchema.js");

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
        let otp = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        let currentCab = {
          _id: requiredCabs[randomCab]._id,
          availability: requiredCabs[randomCab].availability,
          regnumber: requiredCabs[randomCab].regnumber,
          driverName: requiredCabs[randomCab].driverName,
          location: requiredCabs[randomCab].location,
          phone: requiredCabs[randomCab].phone,
          type: requiredCabs[randomCab].type,
          otp,
        };
        res.status(200).json(currentCab);
      }
    } catch (e) {
      res.status(500).send(e);
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
