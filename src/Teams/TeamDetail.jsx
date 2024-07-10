import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueOneApi from "../api";


const TeamDetail = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const getTeam = async () => {
            let team = await LeagueOneApi.getTeamById(teamId);
            setTeam(team);
        };
        getTeam();
    }, [teamId]);

    // IMPLEMENT SPINNER HERE
    if (!team) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h2>{team.name}</h2>
                <h4>{team.description}</h4>
                <h4>Max Teams: {team.maxPlayers}</h4>
            </div>
        </>
    );
};

export default TeamDetail;
