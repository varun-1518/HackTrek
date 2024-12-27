const express = require('express');
const User = require('../models/User');
const Challenge = require('../models/Challenge');
const router = express.Router();

// Get leaderboard data
router.get('/', async (req, res) => {
  try {
    const leaderboard = await User.find()
      .populate('completedChallenges', 'name') // Populate challenge names
      .select('username completedChallenges') // Select necessary fields
      .lean();

    const leaderboardData = leaderboard.map(user => ({
      username: user.username,
      challengesCompleted: user.completedChallenges.map(challenge => challenge.name)
    }));

    res.json(leaderboardData);
  } catch (err) {
    console.error('Error fetching leaderboard:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
