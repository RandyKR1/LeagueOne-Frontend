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
        <div className="list-container">
            <h1>Teams</h1>
            <ul className="list">
                {teams.length > 0 ? (
                    teams.map((team) => (
                        <li key={team.id}>
                            <Link to={`/teams/${team.id}`}>
                                <h3 className="button">{team.name}</h3>
                            </Link>
                            <p>{team.description}</p>
                            <p>Max Players: {team.maxPlayers}</p>
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
