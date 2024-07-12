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
          console.log("Step 6) API.jsx useEffect found token:", token)
          let { username } = jwtDecode(token);
          // Set the token on the LeagueOne model so it can use it for API calls
          LeagueOneApi.token = token;
          console.log("Step 7) Fetching current user with username:", username);
          let currentUser = await LeagueOneApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          console.log("Step 8) Current user received:", currentUser);
        } catch (err) {
          console.log('App loadUserInfo: problem loading', err);
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
      console.log("Step 1) Token received on login:", token);
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
