const express = require('express');
const router = express.Router();

// Reflected XSS challenge route
router.get('/challenge', (req, res) => {
  const userInput = req.query.userInput;
  // Reflect the input back in a script tag
  res.send(`
    <html>
      <head>
        <title>Reflected XSS Challenge</title>
      </head>
      <body>
        <h1>User Input</h1>
        <p>You entered: ${userInput}</p>
        <script>
          alert("XSS Attack: " + "${userInput}");
        </script>
      </body>
    </html>
  `);
});

module.exports = router;
