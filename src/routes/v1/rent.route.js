const express = require("express");
const passport = require("passport");
const { route } = require("../../app.js");
require("dotenv").config();
const { checkBlackListedJWT } = require("../../middlewares/blackListJWT");
const Rental = require("../../models/rentalSchema.js");

const router = express.Router();

router.post(
  "/post_rent",
  passport.authenticate("jwt", { session: false }),
  checkBlackListedJWT,
  async (req, res) => {
    try {
      console.log(req.body.from, req.body.to, req.body.location, req.body.type);
      if (
        req.body.from == undefined ||
        req.body.to == undefined ||
        req.body.location == undefined ||
        req.body.type == undefined
      ) {
        throw new Error("Please send the required fields in the body");
      } else {
        let from = Math.floor(new Date(req.body.from).getTime() / 1000);
        let to = Math.floor(new Date(req.body.to).getTime() / 1000);
        let newRental = new Rental({
          location: {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
          },
          from: from,
          to: to,
          type: req.body.type,
        });
        await newRental.save((err, res) => console.log(err, res));
        res.send("ok");
      }
    } catch (err) {
      res.status(401).send(err.toString());
    }
  }
);

const isMerging = (doc, from, to) => {
  if (doc.from <= from && to <= doc.to) return true;
  return false;
};

router.post(
  "/buy_rent",
  passport.authenticate("jwt", { session: false }),
  checkBlackListedJWT,
  async (req, res) => {
    try {
      console.log(req.body.from, req.body.to, req.body.type);
      if (req.body.from == undefined || req.body.to == undefined || req.body.type == undefined) {
        throw new Error("Please send the required fields in the body");
      } else {
        let from = Math.floor(new Date(req.body.from).getTime() / 1000);
        let to = Math.floor(new Date(req.body.to).getTime() / 1000);
        let docs = await Rental.find({ type: req.body.type });
        let response = [];
        docs.forEach((i) => {
          if (isMerging(i, from, to)) response.push(i);
        });
        res.status(200).json(response);
      }
    } catch (err) {
      res.status(401).send(err.toString());
    }
  }
);

module.exports = router;
