import React, {useContext} from "react";
import {Link} from "react-router-dom"
import Home from "../Home/Home";
import UserContext from "../Auth/UserContext";
import Login from "../Auth/Login";
import SignUp from "../Auth/SignUp";
import "./Nav.css"
import LeagueList from "../Leagues/LeagueList";
import TeamList from "../Teams/TeamList";
import LeagueForm from "../Leagues/LeagueForm";
import TeamForm from "../Teams/TeamForm";



const Nav = ({logout}) => {

    const { currentUser } = useContext(UserContext);

    const loggedInNav = () => {
        return(
            <>
            <ul className="nav"> 
                <Link className="nav" to="/" element={<Home />}>LeagueOne</Link>
                <Link className="nav" to="/leagues" element={<LeagueList />}>Leagues</Link>
                <Link className="nav" to="/leagues/create" element={<LeagueForm />}>Create a League</Link>
                <Link className="nav" to="/teams" element={<TeamList />}>Teams</Link>
                <Link className="nav" to="/teams/create" element={<TeamForm />}>Create a Team</Link>
            </ul>
                <div className="nav-logout">
                    <Link className="nav" to="/" onClick={logout}>Log Out</Link>
                </div>
            </>
        )
    }

    const loggedOutNav =() => {
        return(
            <>
             <ul className="nav">
             <Link className="nav" to="/" element={<Home />}>LeagueOne</Link>
             <Link className="nav" to="/login" element={<Login />}>Login</Link>
             <Link className="nav" to="/signup" element={<SignUp />}>Sign Up</Link>
            </ul>
            </>
        )
    }


    return(
        <nav>
            {currentUser ? loggedInNav() : loggedOutNav()}
        </nav>
    )
} 


export default Nav