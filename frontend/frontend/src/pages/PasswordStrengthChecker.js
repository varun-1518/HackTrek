import React, { useState } from "react";
import "./PasswordStrengthChecker.css";

const PasswordStrengthChecker = () => {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");

  const checkPasswordStrength = (password) => {
    let strength = "";
    if (password.length < 6) {
      strength = "Weak";
    } else if (/[A-Z]/.test(password) && /\d/.test(password) && /[@$!%*?&]/.test(password)) {
      strength = "Strong";
    } else {
      strength = "Medium";
    }
    setStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  return (
    <div className="password-checker">
      <h1>Password Strength Checker</h1>
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={handlePasswordChange}
        className="password-input"
      />
      <p className={`password-strength ${strength.toLowerCase()}`}>
        Strength: {strength}
      </p>
    </div>
  );
};

export default PasswordStrengthChecker;
