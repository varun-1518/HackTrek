const express = require('express');
const router = express.Router();
const axios = require('axios');

// Define an allowlist of valid URLs for redirection
const ALLOWLIST = [
  'https://oldcrypto.com/address1',
  'https://oldcrypto.com/address2',
  'https://oldcrypto.com/address3',
];

router.get('/redirect', async (req, res) => {
  const { target } = req.query;
  
  // Log the received target URL to check if it's correct
  console.log('Received target:', target);

  if (!target) {
    return res.status(400).json({ error: 'Target URL is required' });
  }

  if (!ALLOWLIST.includes(target)) {
    return res.status(400).json({ error: 'Target URL is not in the allowlist.' });
  }

  try {
    // Proceed with fetching data from the target URL
    const response = await axios.get(target, { responseType: 'stream' });

    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error('Error fetching target:', error.message);
    res.status(500).json({ error: 'Failed to fetch target URL' });
  }
});

module.exports = router;
