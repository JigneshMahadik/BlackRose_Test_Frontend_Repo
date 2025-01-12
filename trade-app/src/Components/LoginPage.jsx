import React, { useState } from "react";
import axios from "axios";
import "./CSS/LoginPage.css";
import { navigate, useNavigate } from "react-router-dom"; // Import useNavigate

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNzM2NTk0NjUwfQ.OHXXhoL4KJt_j2A_0Ckj0EBTImMX1OmAmFCoMzq7vF8
      
      // Ensure the token is available in the response
      if (response.data?.token) {
        localStorage.clear();
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
        navigate("/random");
      } else {
        // Handle unexpected cases where the token is missing
        setError("Unexpected error: Token not received. Please try again.");
      }
    } catch (err) {
      // Set error message from server or a default one
      setError(err.response?.data?.detail || "Wrong username or password!");
    }
  };

  return (
    <div className="login-container">
      <h1>TradeX Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LoginPage;
