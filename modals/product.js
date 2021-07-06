const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  Name: String,
  Quantity: Number,
  Price: Number,
});
module.exports = mongoose.model("Product", productSchema);
