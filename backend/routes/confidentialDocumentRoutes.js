const express = require('express');
const path = require('path');

const router = express.Router();

// Confidential Document Route
router.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../data/confidential.docx');
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving confidential document' });
    }
  });
});

module.exports = router;
