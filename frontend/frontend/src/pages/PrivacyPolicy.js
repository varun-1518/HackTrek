import React, { useEffect, useState } from 'react';

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/privacy-policy')
      .then(response => response.text())
      .then(data => setPolicy(data))
      .catch(err => console.error('Error fetching privacy policy:', err));
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#121212', color: '#fff' }}>
      <h1>Privacy Policy</h1>
      <pre
        style={{
          backgroundColor: '#333',
          color: '#ddd',
          padding: '15px',
          borderRadius: '5px',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {policy}
      </pre>
      <button
        style={{
          marginTop: '20px',
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={() => alert('Thank you for acknowledging our Privacy Policy!')}
      >
        Acknowledge
      </button>
    </div>
  );
};

export default PrivacyPolicy;
