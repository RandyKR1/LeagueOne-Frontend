import React, { useState } from "react";
import LeagueOneApi from "../api";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../Hooks/LocalStorage";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [, setToken] = useLocalStorage("token");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await LeagueOneApi.loginUser(formData);
      console.log("Token:", token);
      if (token) {
        setToken(token);
        navigate("/");
      } else {
        setError("No Token Found");
      }
    } catch (error) {
      console.log("Error Response:", error); // Log the error for debugging
      if (error.data) {
        setError(error.data.error);
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
