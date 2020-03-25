var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  userId: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  fullname: { type: String, required: false },
  contact: { type: String, required: false },
  address: { type: String, required: false },
  dob: { type: Date, required: false },
  keyList: { type: Array, required: false },
  files: { type: Array, required: false }
});

module.exports = mongoose.model("UserStore", userSchema);
