const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    cryptoKeyId: { type: Schema.Types.ObjectId, ref: 'CryptoKey', required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'UserStore', required: true },
    status: { type: String, required: true },
    rotation: { type: String, required: true },
    alias: { type: String, required: true },
    description: { type: String, required: false },
    creationDate: { type: Date, required: true },
    permissions: { type: Object, required: true }
});

module.exports = mongoose.model("KeyStore", schema);
