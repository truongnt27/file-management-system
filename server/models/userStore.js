var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  fullname: { type: String, required: true },
  contact: { type: String, required: true },
  address: { type: String, required: true },
  dob: { type: Date, required: true },
  keyList: { type: Array, required: true },
  files: { type: Array, required: true }
});

module.exports = mongoose.model("UserStore", userSchema);
