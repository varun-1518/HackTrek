const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Vulnerable API: SQL Injection
router.get("/sql-injection", async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    // Simulate raw query vulnerability
    const users = await mongoose.connection.db.collection("users").aggregate([
      {
        $match: {
          $expr: { $regexMatch: { input: "$username", regex: username, options: "i" } },
        },
      },
    ]).toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.json(users);
  } catch (err) {
    console.error("Error in SQL Injection endpoint:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }

  
});

module.exports = router;
