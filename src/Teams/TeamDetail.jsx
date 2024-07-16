import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const TeamDetail = () => {
    const {currentUser} = useContext(UserContext)
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);

    useEffect(() => {
        const getTeam = async () => {
            try {
                let team = await LeagueOneApi.getTeamById(teamId);
                setTeam(team);
            } catch (error) {
                console.error("Error fetching team:", error);
            }
        };

        getTeam();
    }, [teamId]);

    if (!team) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{team.name}</h2>
            <p>{team.description}</p>
            <p>Max Players: {team.maxPlayers}</p>
            <p>Admin: {team.admin?.firstName}</p>

            <div className="actions">
                    <Link className="button" to={`/teams/${teamId}/join`}>Join Team</Link>
            </div>

            <h3>Members:</h3>
            {team.players && team.players.length > 0 ? (
                <ul className="list">
                    {team.players.map(member => (
                        <li key={member.id}>{member.firstName} {member.lastName}</li>
                    ))}
                </ul>
            ) : (
                <p>No members in this team.</p>
        )}
            {currentUser.isTeamAdmin && (
                <Link className="button" to={`/teams/${teamId}/update`}>Update Team</Link>
            )}
        </div>
    );
};

export default TeamDetail;
