const mongoose = require("mongoose");

const Shoes = new mongoose.Schema(
  {
    name: { type: String },
    brand: { type: String },
    price: { type: Number },
    size: { type: String },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("shoe", Shoes);
