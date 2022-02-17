const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Location = new Schema({
  latitude: Number,
  longitude: Number
})

const FreeCabsSchema = new Schema({
  availability: Boolean,
  regnumber: String,
  driverName: String,
  location: Location,
  phone: String,
  type:String
});

module.exports = mongoose.model("freecabs", FreeCabsSchema);
