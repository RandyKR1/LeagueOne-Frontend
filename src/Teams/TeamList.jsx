import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamList = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                let res = await LeagueOneApi.getTeams({}); // {} for filters
                setTeams(res);
            } catch (e) {
                console.error(e);
            }
        };
        fetchTeams();
    }, []);

    return (
        <>
            <h1>Teams</h1>
            <div>
                <ul>
                    {teams.length > 0 ? (
                        teams.map((team) => (
                            <li key={team.id}>
                                <Link to={`/teams/${team.id}`}>
                                    <h3>{team.name}</h3>
                                </Link>
                                <p>{team.description}</p>
                                <p>Max Players: {team.maxPlayers}</p>
                            </li>
                        ))
                    ) : (
                        <p>No leagues found.</p>
                    )}
                </ul>
            </div>
        </>
    );
}

export default TeamList