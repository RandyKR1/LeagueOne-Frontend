import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const MatchList = ({ leagueId }) => {
    const [matches, setMatches] = useState([]);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                let res = await LeagueOneApi.getMatches(leagueId);
                setMatches(res);
            } catch (e) {
                console.error(e);
            }
        };

        fetchMatches();
    }, [leagueId]);

    return (
        <div className="container">
            <h1>Matches</h1>
            <ul className="list">
                {matches.map((match) => (
                    <li key={match.id}>
                        <Link to={`/leagues/${leagueId}/matches/${match.id}`}>
                            {match.eventName}
                        </Link>
                        <p>{match.eventLocation}</p>
                        <p>{match.eventResults}</p>
                        <p>{match.teams}</p>
                    </li>
                ))}
            </ul>

            {currentUser.isLeagueAdmin && (
                <button>
                <Link to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link>
                </button>
            )}
            
        </div>
    );
};

export default MatchList;
