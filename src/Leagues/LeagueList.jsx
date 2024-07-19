import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";

const LeagueList = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                let res = await LeagueOneApi.getLeagues({});
                setLeagues(res);
            } catch (e) {
                console.error(e);
            }
        };
        fetchLeagues();
    }, []);

    console.log(leagues)
    return (
        <div className="container">
            <h1>Leagues</h1>
            <ul className="list">
                {leagues.length > 0 ? (
                    leagues.map((league) => (
                        <li key={league.id}>
                            <Link to={`/leagues/${league.id}`}>
                                <h3>{league.name}</h3>
                            </Link>
                            <p>{league.description}</p>
                            <p>Max Teams: {league.maxTeams}</p>
                            <p>Admin: <Link to={`/users/${league.admin.username}`}>{league.admin.firstName} {" "} {league.admin.lastName}</Link></p>
                        </li>
                    ))
                ) : (
                    <p>No leagues found.</p>
                )}
            </ul>
        </div>
    );
};

export default LeagueList;
