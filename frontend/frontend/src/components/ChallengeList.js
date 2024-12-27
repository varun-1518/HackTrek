import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ChallengeList = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/challenges')
      .then(res => setChallenges(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Challenges</h1>
      <ul>
        {challenges.map(challenge => (
          <li key={challenge._id}>{challenge.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengeList;
