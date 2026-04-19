const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  price: Number,
  location: String
});

module.exports = mongoose.model("Property", propertySchema);