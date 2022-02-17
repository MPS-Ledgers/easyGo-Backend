const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Availability = new Schema({
  scab: Number,
  mux: Number,
  hilander: Number,
  vcross: Number,
});

const ShopSchema = new Schema({
  latitude: Number,
  longitude: Number,
  description: String,
  availability: [Availability],
});

module.exports = mongoose.model("shops", ShopSchema);

// const x = {
//   _id: { $oid: "620e1e77d27d499276227ff4" },
//   latitude: { $numberDouble: "13.05" },
//   longitude: { $numberDouble: "80.2824" },
//   "description ": "Marina Beach",
//   availability: {
//     scab: { $numberInt: "2" },
//     mux: { $numberInt: "3" },
//     hilander: { $numberInt: "5" },
//     vcross: { $numberInt: "7" },
//   }
//   ,
// };
