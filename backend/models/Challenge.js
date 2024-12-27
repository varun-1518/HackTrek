const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium'], required: true },
  category: { type: String, required: true },
  hints: { type: [String], default: [] },
  solution: { type: String, required: true },
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
