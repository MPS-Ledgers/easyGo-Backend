const express = require("express");
const authRoutes = require("./auth.route");
const otherRoutes = require("./other.route");
const shopRoutes = require("./shops.route");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/other", otherRoutes);
router.use("/shops", shopRoutes);

module.exports = router;
