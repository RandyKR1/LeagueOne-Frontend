import React, {useState, useEffect} from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Routing from './Routing/Routing'
import JoblyApi from './api'
import useLocalStorage from './Hooks/LocalStorage'
import {jwtDecode} from "jwt-decode"; 
import UserContext from "./Auth/UserContext"

export const TOKEN_STORAGE_ID = "leagueone-token";

function App() {
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      if (token) {
        try {
          let { username } = jwtDecode(token);
          // Set the token on the JoblyApi class so it can use it for API calls
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error('App loadUserInfo: problem loading', err);
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
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  };

  const login = async(loginData) => {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

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
