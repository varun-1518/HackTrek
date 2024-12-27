import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token, userId } = response.data;

      // Save token and userId to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      setMessage('Login successful');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleLogin} className="auth-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">Login</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
