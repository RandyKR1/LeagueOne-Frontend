// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routing from './Routing/Routing';
import useLocalStorage from './Hooks/LocalStorage';
import {jwtDecode} from 'jwt-decode';
import UserContext from './Auth/UserContext';
import LeagueOneApi from './api';

const TOKEN_STORAGE_ID = "leagueone-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);  // Change to manage loading state

  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          LeagueOneApi.token = token;
          const user = await LeagueOneApi.getCurrentUser(decoded.username);
          setCurrentUser(user);
        } catch (error) {
          console.error("Error fetching current user", error);
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [token]);

  const signup = async (signupData) => {
    try {
      const token = await LeagueOneApi.registerUser(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('Signup failed', errors);
      return { success: false, errors };
    }
  };

  const login = async (loginData) => {
    try {
      const token = await LeagueOneApi.loginUser(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('Login failed', errors);
      return { success: false, errors };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  if (loading) return <div>Loading...</div>;  // Ensure loading screen until data is ready

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <BrowserRouter>
        <div className="App">
          <Routing signup={signup} login={login} logout={logout} />
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
