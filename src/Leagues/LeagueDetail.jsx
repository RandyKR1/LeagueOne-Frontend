import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LeagueOneApi from "../api";
import MatchList from "../Matches/MatchList";


const LeagueDetail = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);

    useEffect(() => {
        const getLeague = async () => {
            let league = await LeagueOneApi.getLeagueById(id);
            setLeague(league);
        };
        getLeague();
    }, [id]);

    // IMPLEMENT SPINNER HERE
    if (!league) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h2>{league.name}</h2>
                <h4>{league.description}</h4>
                <h4>Max Teams: {league.maxTeams}</h4>
                <div>
                    <MatchList leagueId={league.id} />
                </div>
            </div>
        </>
    );
};

export default LeagueDetail;
