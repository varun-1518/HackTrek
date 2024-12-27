import React from 'react';

const ConfidentialDocument = () => {
  const handleDownload = () => {
    window.location.href = 'http://localhost:5000/api/confidential-document';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Confidential Document</h1>
      <p>
        This document contains sensitive information. Please handle it responsibly and refrain from unauthorized sharing.
      </p>
      <button
        style={{
          padding: '10px 15px',
          backgroundColor: '#dc3545',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
        }}
        onClick={handleDownload}
      >
        Download Confidential Document
      </button>
    </div>
  );
};

export default ConfidentialDocument;
