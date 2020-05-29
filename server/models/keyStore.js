const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ROTATE_PERIOD } = require('../helpers/constant');
const schema = new Schema({
    rotation: { type: String, required: true, default: '30_DAYS' },
    lastRotation: { type: String, required: true },
    createdDate: { type: Date, required: true },
    plaintext: { type: String, required: true }
});

module.exports = mongoose.model("KeyStore", schema);
