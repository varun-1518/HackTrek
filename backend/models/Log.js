const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  challengeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge', required: true },
  timestamp: { type: Date, default: Date.now },
  success: { type: Boolean, required: true },
});

module.exports = mongoose.model('Log', LogSchema);
