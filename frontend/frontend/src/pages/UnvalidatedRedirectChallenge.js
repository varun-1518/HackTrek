import React, { useState } from 'react';
import axios from 'axios';

const UnvalidatedRedirectChallenge = () => {
  const [target, setTarget] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRedirect = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
  
    try {
      const response = await axios.get(
        `http://localhost:5000/api/redirects/redirect`,
        { params: { target } }
      );
  
      if (response.status === 302 || response.data.includes("Redirecting")) {
        setMessage(`Redirecting to ${target}`);
        // Perform manual redirection
        window.location.href = target;
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "Redirection failed.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };
  

  return (
    <div>
      <h1>Unvalidated Redirect Challenge</h1>
      <form onSubmit={handleRedirect}>
        <label>
          Enter Target URL:
          <input
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="Enter URL here"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UnvalidatedRedirectChallenge;
