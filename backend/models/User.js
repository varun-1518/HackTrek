const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  score: { type: Number, default: 0 },
  completedChallenges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' }] ,
});

module.exports = mongoose.model('User', UserSchema);
