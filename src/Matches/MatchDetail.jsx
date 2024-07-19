import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const MatchDetail = () => {
    const { leagueId, matchId } = useParams();
    const [match, setMatch] = useState(null);
    const { currentUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const match = await LeagueOneApi.getMatch(leagueId, matchId);
                setMatch(match);
            } catch (error) {
                console.error("Error fetching match:", error);
            }
        };

        fetchMatch();
    }, [leagueId, matchId]);

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteMatch(leagueId, matchId);
            navigate(`/leagues/${leagueId}`);
        } catch (error) {
            console.error("Error deleting match:", error);
        }
    };

    if (!match) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Match Detail</h1>
            <p>Event Location: {match.eventLocation}</p>
            <div>
                <h2>Event Results</h2>
                <p>{match.homeTeam.name}: {match.team1Score}</p>
                <br />
                <p>{match.awayTeam.name}: {match.team2Score}</p>
            </div>
            <Link className="button" to={`/leagues/${leagueId}`}>{match.league.name}</Link>

            {(currentUser.isLeagueAdmin && currentUser.id === match.league.adminId) && (
                <div className="actions">
                    <button className="button">
                        <Link to={`/leagues/${leagueId}/matches/${matchId}/update`}>Update</Link>
                    </button>
                    <button className="button">
                        <Link to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link>
                    </button>
                    <button className="button" onClick={handleDelete}>Delete Match</button>
                </div>
            )}
        </div>
    );
};

export default MatchDetail;
