import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamList = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                let res = await LeagueOneApi.getTeams({});
                setTeams(res);
            } catch (e) {
                console.error(e);
            }
        };

        fetchTeams();
    }, []);

    return (
        <>
        <div className="container">
        <div className="header-list">
                <div className="header-list-display">
                    <p>Teams</p> 
                </div>
                <div className="header-list-display">
                    <Link to={"/teams/create"}>Create Team</Link>
                </div>
            </div>
        <div className="list-container">
            <ul className="list">
                {teams.length > 0 ? (
                    teams.map((teams) => (
                        <li key={teams.id}>
                            <Link to={`/teams/${teams.id}`}>
                                <div className="list-display-container">
                                    <div className="list-display">
                                        <h3>{teams.name}</h3>
                                    </div>
                                    <div className="list-display">
                                    <p>Max Players: {teams.maxPlayers}</p>
                                    <p>Admin: <Link to={`/users/${teams.admin.username}`}>{teams.admin.firstName} {" "} {teams.admin.lastName}</Link></p>
                                    </div>
                                </div>
                            </Link>
                            
                        </li>
                    ))
                ) : (
                    <p>No teams found.</p>
                )}
            </ul>
        </div>
        </div>
        </>
    );
};

export default TeamList;
