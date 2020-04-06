const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const constant = require('../helpers/constant');

const schema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'UserStore', required: true },
  status: { type: String, required: true, default: constant.STATUS.ENABLE },
  keyId: { type: Schema.Types.ObjectId, ref: 'KeyStore', required: true },
  size: { type: String, required: true }
});

module.exports = mongoose.model("FileStore", schema);
