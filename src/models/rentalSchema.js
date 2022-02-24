const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema({
  latitude: Number,
  longitude: Number,
});

const Rental = new Schema({
  location: Location,
  from: Number,
  to: Number,
  type: String,
});

module.exports = mongoose.model("rentals", Rental);
