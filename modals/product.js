const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
  ProductName: String,
  Image: String,
});
module.exports = mongoose.model("Product", productSchema);
