var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
    description: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'UserStore', required: true },
    time: { type: Date, required: true }
});

module.exports = mongoose.model("EventLog", schema);
