import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueOneApi from "../api";
import MatchList from "../Matches/MatchList";

const LeagueDetail = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [error, setError] = useState(null); // Add error state

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
            <h4>{league.description}</h4>
            <h4>Max Teams: {league.maxTeams}</h4>
            <h4>League Admin: {league.admin.id}</h4>
            <div>
                <MatchList leagueId={league.id} />
            </div>
        </div>
    );
};

export default LeagueDetail;
