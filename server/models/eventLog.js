var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    description: { type: String, required: true },
    userId: { type: String, required: true },
    time: { type: Date, required: true },
});

module.exports = mongoose.model("EventLog", schema);
