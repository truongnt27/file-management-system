const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'UserStore', required: true },
  receiver: [{ type: Schema.Types.ObjectId, ref: 'UserStore' }],
  creationDate: { type: Date, required: true },
  message: { type: String, required: true },
  readBy: [{ type: String, required: true }]
});

module.exports = mongoose.model("Notification", schema);
