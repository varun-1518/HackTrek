const express = require('express');
const router = express.Router();
const { processUserMessage } = require('./chatbotService');

router.post('/message', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ reply: "Message is required." });
    }

    const reply = processUserMessage(message);
    res.json({ reply });
});

module.exports = router;
