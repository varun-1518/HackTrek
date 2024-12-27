import React, { useState } from "react"; // Removed useEffect here
import { Link } from "react-router-dom";
import './Challenges.css';

const Challenges = () => {
  // Retrieve the completed challenges from localStorage or set as an empty array
  const storedChallenges = JSON.parse(localStorage.getItem("completedChallenges")) || [];

  const [completedChallenges, setCompletedChallenges] = useState(storedChallenges);

  // Function to handle marking and unmarking a challenge as done
  const handleMarkAsDone = (challengeName) => {
    // Check if the challenge is already marked as done
    if (completedChallenges.includes(challengeName)) {
      // If it is, unmark it
      const updatedChallenges = completedChallenges.filter(challenge => challenge !== challengeName);
      setCompletedChallenges(updatedChallenges);
      // Store the updated list in localStorage
      localStorage.setItem("completedChallenges", JSON.stringify(updatedChallenges));
    } else {
      // If it is not, mark it as done
      const updatedChallenges = [...completedChallenges, challengeName];
      setCompletedChallenges(updatedChallenges);
      // Store the updated list in localStorage
      localStorage.setItem("completedChallenges", JSON.stringify(updatedChallenges));
    }
  };

  // List of challenges
  const challenges = [
    {
      name: "NoSQL Injection",
      description: "Exploit unvalidated inputs to retrieve users database records",
      link: "/challenges/sql-injection"
    },
    {
      name: "Admin Login",
      description: "Use brute force to identify the admin account credentials",
      link: "/login"
    },
    {
      name: "File Upload",
      description: "Test the file upload functionality for security flaws",
      link: "/challenges/FileUpload"
    },
    {
      name: "File Upload with Size Limit",
      description: "Test the file upload with size limitations",
      link: "/challenges/FileUploadWithSizeLimit"
    },
    {
      name: "Login testuser",
      description: " Discover weak test user credentials via injection or brute force",
      link: "/login"
    },
    {
      name: "Privacy Policy",
      description: "Test the accessibility and permissions of the Privacy Policy page",
      link: "/home"
    },
    {
      name: "Confidential Document",
      description: "Challenge the security of restricted Confidential Document access",
      link: "/home"
    },
    {
      name: "Bonus Payload",
      description: "Test the application with an XSS payload",
      link: "/bonus-xss"
    },
    {
      name: "Reflected XSS",
      description: "Use script tags to identify and exploit cross-site scripting vulnerabilities",
      link: "/reflected-xss-challenge"
    },
    {
      name: "Unvalidated Redirect",
      description: "Test the system for unvalidated redirects and forwards",
      link: "/unvalidated-redirects"
    },

    {
      name: "Bully ChatBot",
      description: "Bully chatbot to get coupon code",
      link: "/chatbot"
    },
    {
      name: "Weak Password Strength Validation",
      description: "Test the system for insufficient password strength validation, allowing weak or easily guessable passwords",
      link: "/password-checker"
    }
    
  ];

  return (
    <div>
      <h1>Challenges</h1>

      {/* Scoreboard */}
      <div className="scoreboard">
        <p>Challenges Completed: {completedChallenges.length}/{challenges.length}</p>
      </div>

      <div className="challenge-list">
        {challenges.map((challenge, index) => (
          <div key={index} className="challenge-card">
            <h3>{challenge.name}</h3>
            <p>{challenge.description}</p>
            <Link to={challenge.link}>Start Challenge</Link>
            <button 
              className={`mark-done-btn ${completedChallenges.includes(challenge.name) ? 'completed' : ''}`}
              onClick={() => handleMarkAsDone(challenge.name)}
            >
              {completedChallenges.includes(challenge.name) ? 'Unmark as Done' : 'Mark as Done'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;
