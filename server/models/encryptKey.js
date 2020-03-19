var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    keyId: { type: Schema.Types.ObjectId, ref: 'KeyStore' },
    userId: { type: String, required: true },
    status: { type: String, required: true },
    rotation: { type: String, required: true },
    alias: { type: String, required: true },
    description: { type: String, required: true },
    createdDate: { type: Date, required: true },
    userPermision: { type: Array, required: true }
});
aaa
module.exports = mongoose.model("EncryptKey", schema);
