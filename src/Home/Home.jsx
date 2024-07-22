import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import Login from "../Auth/Login";
import Alert from "../Common/Alert"; // Adjust the import path based on your file structure

const Home = ({ login }) => {
    const { currentUser } = useContext(UserContext);
    const [alertMessages, setAlertMessages] = useState([]);

    const loggedOutHome = () => {
        return (
            <div className="container">
                <h1 className="home-h1">Welcome</h1>
                <h2 className="home-bio">LeagueOne is a platform for creating and managing user-owned leagues at the press of a button.</h2>
                <div className="home-auth-wrapper">
                    <Login login={login} />
                    <p>First time? Sign up below</p>
                    <Link to={"/signup"}>sign up</Link>
                </div>
            </div>
        );
    };

    const loggedInHome = () => {
        return (
            <div className="home-container">
                <h1 className="home-h1">Hi {currentUser.firstName}!</h1>
                <div className="home-display-container">
                    <div className="home-display">
                        <h1>Your Teams</h1>
                        {currentUser.administeredTeams && currentUser.administeredTeams.length > 0 ? (
                            currentUser.administeredTeams.map((team) => (
                                <Link to={`/teams/${team.id}`} key={team.id}>
                                    <div className="home-team">
                                        <h3>{team.name}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No teams to display</p>
                        )}
                    </div>
                    <div className="home-display">
                        <h1>Your Leagues</h1>
                        {currentUser.administeredLeagues && currentUser.administeredLeagues.length > 0 ? (
                            currentUser.administeredLeagues.map((league) => (
                                <Link to={`/leagues/${league.id}`} key={league.id}>
                                    <div className="home-league">
                                        <h3>{league.name}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No leagues to display</p>
                        )}
                    </div>
                    <div className="home-display">
                        <h1>Joined Teams</h1>
                        {currentUser.teams && currentUser.teams.length > 0 ? (
                            currentUser.teams.map((team) => (
                                <Link to={`/teams/${team.id}`} key={team.id}>
                                    <div className="home-team">
                                        <h3>{team.name}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No teams to display</p>
                        )}
                    </div>
                    <div className="home-display">
                        <h1>Joined Leagues</h1>
                        {currentUser.leagues && currentUser.leagues.length > 0 ? (
                            currentUser.leagues.map((league) => (
                                <Link to={`/leagues/${league.id}`} key={league.id}>
                                    <div className="home-league">
                                        <h3>{league.name}</h3>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p>No leagues to display</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                {alertMessages.length > 0 && <Alert messages={alertMessages} />}
                {currentUser ? loggedInHome() : loggedOutHome()}
            </div>
        </>
    );
};

export default Home;
