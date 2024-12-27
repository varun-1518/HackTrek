import React, { useState } from "react";
import axios from "axios";
import "./SQLInjection.css";

const SQLInjection = () => {
  const [username, setUsername] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/challenges/sql-injection?username=${username}`
      );
      setResult(response.data);
    } catch (err) {
      setResult(err.response?.data?.message || "Error performing SQL Injection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sql-injection-container">
      <div className="sql-injection-box">
        <h1>NoSQL Injection Challenge</h1>
        <p>Search for a user by username:</p>
        <input
          type="text"
          className="sql-injection-input"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          className={`sql-injection-button ${loading ? "loading" : ""}`}
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
        <div className="sql-injection-result">
          <h2>Result:</h2>
          <div className="sql-injection-result-box">
            {result ? (
              <pre>{JSON.stringify(result, null, 2)}</pre>
            ) : (
              <p>No results to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SQLInjection;
