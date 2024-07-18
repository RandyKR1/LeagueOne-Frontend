import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const MatchDetail = () => {
    const { leagueId, matchId } = useParams();
    const [match, setMatch] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const res = await LeagueOneApi.getMatch(leagueId, matchId);
                setMatch(res);
            } catch (error) {
                console.error("Error fetching match:", error);
            }
        };

        fetchMatch();
    }, [leagueId, matchId]);

    if (!match) {
        return <div>Loading...</div>;
    }

    console.log(match.team1)


    return (
        <div className="container">
            <h1>Match Detail</h1>
                <p>Event Name: {match.eventName}</p>
                <p>Event Location: {match.eventLocation}</p>
                <div>
                    <h2>Event Results</h2>
                        <p>{match.homeTeam.name}:{match.team1Score}</p> 
                        <br />
                        <p>{match.awayTeam.name}:{match.team2Score}</p>
                </div>

                {currentUser.isLeagueAdmin && (
                    <div className="actions">
                        <button className="button">
                            <Link to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link>
                        </button>
                    </div>
            )}
        </div>

    );
};

export default MatchDetail;
