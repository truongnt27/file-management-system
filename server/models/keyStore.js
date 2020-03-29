var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    keyId: { type: Schema.Types.ObjectId, ref: 'CryptoKey' },
    userId: { type: String, required: true },
    status: { type: String, required: true },
    rotation: { type: String, required: true },
    alias: { type: String, required: true },
    description: { type: String, required: false },
    createdDate: { type: Date, required: true },
    userPermision: { type: Object, required: true }
});

module.exports = mongoose.model("KeyStore", schema);
