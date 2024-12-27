// src/components/MarkAsDoneButton.js
import React, { useState, useEffect } from 'react';

const MarkAsDoneButton = () => {
  // Check if the task is marked as done in localStorage
  const [isDone, setIsDone] = useState(localStorage.getItem('isDone') === 'true');

  // Update the button state when the component mounts
  useEffect(() => {
    if (isDone) {
      localStorage.setItem('isDone', 'true');
    } else {
      localStorage.removeItem('isDone');
    }
  }, [isDone]);

  const handleClick = () => {
    // Toggle the state when the button is clicked
    setIsDone(prevState => !prevState);
  };

  return (
    <button
      className="mark-done-btn"
      style={{
        backgroundColor: isDone ? '#cccccc' : '#28a745',
        cursor: isDone ? 'not-allowed' : 'pointer',
      }}
      onClick={handleClick}
      disabled={isDone}
    >
      {isDone ? 'Marked as Done' : 'Mark as Done'}
    </button>
  );
};

export default MarkAsDoneButton;
