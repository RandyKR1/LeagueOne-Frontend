import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="container">
            <h1>This is the Home Page</h1>

            <div className="links">
                <Link to="/leagues">Leagues</Link>
                <Link to="/teams">Teams</Link>
                <Link to="/users">Users</Link>
            </div>
        </div>
    );
};

export default Home;
