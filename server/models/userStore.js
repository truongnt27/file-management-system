const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constant = require('../helpers/constant');

var userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true, default: constant.USER_TYPES.USER },
  status: { type: String, required: true, default: constant.USER_STATUS.ACTIVE },
  fullname: { type: String, required: false },
  phone: { type: String, required: false },
  address: { type: String, required: false },
  dob: { type: Date, required: false },
  keyList: [{ type: Schema.Types.ObjectId, ref: 'KeyStore' }],
  files: [{ type: Schema.Types.ObjectId, ref: 'FileStore' }],
  avatarPicture: { type: String, required: false },
  googleId: { type: String, required: false },
  lastActive: { type: Date }
});

module.exports = mongoose.model("UserStore", userSchema);
