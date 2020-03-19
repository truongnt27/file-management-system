var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  createdDate: { type: Date, required: true },
  plaintext: { type: String, required: true },
});

module.exports = mongoose.model("KeyStore", schema);
