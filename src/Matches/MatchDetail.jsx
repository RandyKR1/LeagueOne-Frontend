import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const MatchDetail = () => {
    const { leagueId, matchId } = useParams();
    const [match, setMatch] = useState(null);

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

    return (
        <div className="container">
            <h1>Match Detail</h1>
            <p>Event Name: {match.eventName}</p>
            <p>Event Location: {match.eventLocation}</p>
            <p>Event Results: {match.eventResults}</p>
        </div>
    );
};

export default MatchDetail;
