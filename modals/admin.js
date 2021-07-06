const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  Name: String,
  Mobile: Number,
  Age: Number,
});
module.exports = mongoose.model("Admin", adminSchema);
