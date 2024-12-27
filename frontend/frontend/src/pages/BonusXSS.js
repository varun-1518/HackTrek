import React from 'react';

const BonusXSS = () => {
  // Extract the `payload` from the URL query string
  const queryParams = new URLSearchParams(window.location.search);
  const payload = queryParams.get('payload') || '';

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bonus DOM-Based XSS Challenge</h1>
      <p>
        Try injecting a payload in the URL like:
        <code>?payload=&lt;iframe...&gt;</code>
      </p>
      <div
        id="bonus-content"
        dangerouslySetInnerHTML={{ __html: payload }} // Unsafe injection
      ></div>
    </div>
  );
};

export default BonusXSS;
