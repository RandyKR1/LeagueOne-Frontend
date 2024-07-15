import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routing from './Routing/Routing'
import useLocalStorage from './Hooks/LocalStorage'
import {jwtDecode} from "jwt-decode"
import UserContext from "./Auth/UserContext"
import LeagueOneApi from './api'

const TOKEN_STORAGE_ID = "leagueone-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  

  useEffect(() => {

    const getCurrentUser = async () => {
      console.log("Step 5) App.jsx: checking token in useEffect");
      if (token) {
        try {
          let { username } = jwtDecode(token);
          LeagueOneApi.token = token;
          console.log("Step 7) Fetching current user with username:", username);
          let currentUser = await LeagueOneApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.log("Current user received:", currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }

    // Set infoLoaded to false while async getCurrentUser runs
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  const signup = async (signupData) => {
    try {
      let token = await LeagueOneApi.registerUser(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  };

  const login = async (data) => {
    try {
      let token = await LeagueOneApi.loginUser(data);
      setToken(token); // Ensure this correctly updates the token state
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  };
  

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          <Routing signup={signup} login={login} logout={logout} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App
