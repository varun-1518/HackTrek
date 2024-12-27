const express = require('express');
const router = express.Router();

// XSS Challenge Route
router.get('/xss-challenge', (req, res) => {
  const payload = req.query.payload || '';
  console.log('Payload received:', payload);

  res.send(`
    <html>
      <head>
        <title>Bonus XSS Challenge</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
          form { margin: 20px auto; }
          input[type="text"] { width: 80%; padding: 10px; }
          button { padding: 10px 20px; background-color: #007bff; color: #fff; border: none; }
          button:hover { background-color: #0056b3; }
        </style>
      </head>
      <body>
        <h1>Bonus DOM-Based XSS Challenge</h1>
        <form method="GET" action="/xss-challenge">
          <input type="text" name="payload" placeholder="Enter your payload..." />
          <button type="submit">Submit</button>
        </form>
        <div id="bonus-content">${payload}</div>
      </body>
    </html>
  `);
});

module.exports = router;
