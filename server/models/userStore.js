const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersTypes = require('../helpers/constant');

var userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true, default: usersTypes.USER_TYPES.USER },
  fullname: { type: String, required: false },
  profile: { type: String, required: false },
  address: { type: String, required: false },
  dob: { type: Date, required: false },
  keyList: { type: Array, required: false },
  files: { type: Array, required: false },
  avatarPicture: { type: String, required: false },
  googleId: { type: String, required: false },
  lastActive: { type: Date }
});

module.exports = mongoose.model("UserStore", userSchema);
