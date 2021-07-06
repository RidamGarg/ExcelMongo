const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  Name: String,
  Mobile: Number,
  Age: Number,
});
module.exports = mongoose.model("User", userSchema);
