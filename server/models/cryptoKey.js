const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    createdDate: { type: Date, required: true },
    plaintext: { type: String, required: true },
});

module.exports = mongoose.model("KeyStore", schema);