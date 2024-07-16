import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LeagueOneApi from "../api";
import MatchList from "../Matches/MatchList";
import UserContext from "../Auth/UserContext";

const LeagueDetail = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [error, setError] = useState(null); // Add error state
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const getLeague = async () => {
            try {
                let league = await LeagueOneApi.getLeagueById(id);
                setLeague(league);
            } catch (err) {
                setError(err); // Set error state
            }
        };
        getLeague();
    }, [id]);

    if (error) return <div>Error loading league details: {error.message}</div>; // Display error message

    if (!league) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{league.name}</h2>
            <p>{league.description}</p>
            <p>Max Teams: {league.maxTeams}</p>
            <p>League Admin: {league.admin.id}</p>

            <div className="actions">
                <Link className="button" to={`/leagues/${league.id}/matches`}>View Matches</Link>
                { /* Render LeagueJoin component if the current user is a team admin */}
                {currentUser.isTeamAdmin && (
                        <Link className="button" to={`/leagues/${league.id}/join`}>Join League</Link>
                )}
                {currentUser.isLeagueAdmin && (
                        <Link className="button" to={`/leagues/${league.id}/update`}>Update League</Link>
                )}
            </div>
        </div>

    );
};

export default LeagueDetail;
