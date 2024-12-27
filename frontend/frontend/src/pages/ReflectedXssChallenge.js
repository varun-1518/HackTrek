import React, { useState } from 'react';
import axios from 'axios';
import './ReflectedXss.css';  // Import the custom CSS for the component

function ReflectedXssChallenge() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send user input to backend
      const res = await axios.get(`http://localhost:5000/api/reflected-xss-challenge/challenge?userInput=${userInput}`);
      setResponse(res.data);  // Store the raw HTML response
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  // After the response is set, manually run the script
  React.useEffect(() => {
    if (response) {
      const scriptTags = response.match(/<script[^>]*>(.*?)<\/script>/g);
      if (scriptTags) {
        scriptTags.forEach((scriptTag) => {
          const scriptContent = scriptTag.replace(/<\/?script>/g, '');
          const script = document.createElement('script');
          script.innerHTML = scriptContent;
          document.body.appendChild(script); // Append the script to the body for execution
        });
      }
    }
  }, [response]);

  return (
    <div className="app-container">
      <h1 className="header">Reflected XSS Challenge</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter some input"
          className="input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>
      <div className="response-container">
        {/* Inject the HTML response (without script execution) */}
        <div dangerouslySetInnerHTML={{ __html: response }} />
      </div>
    </div>
  );
}

export default ReflectedXssChallenge;
