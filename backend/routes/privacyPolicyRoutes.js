const express = require('express');
const path = require('path');

const router = express.Router();

// Privacy Policy Route
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/privacy-policy.txt');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving privacy policy' });
    }
  });
});

module.exports = router;
