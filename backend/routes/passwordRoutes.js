const express = require("express");
const router = express.Router();

router.post("/validate", (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const lengthValid = password.length >= 6;

  if (hasUppercase && hasNumber && hasSpecialChar && lengthValid) {
    res.json({ strength: "Strong" });
  } else if (lengthValid) {
    res.json({ strength: "Medium" });
  } else {
    res.json({ strength: "Weak" });
  }
});

module.exports = router;