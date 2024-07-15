import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamDetail = () => {
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
            <h4>{team.description}</h4>
            <h4>Max Players: {team.maxPlayers}</h4>
            <h3>Admin: {team.admin?.firstName}</h3> {/* Display admin name if available */}

            <button>
                <Link to={`/teams/${teamId}/join`}>Join Team</Link>
            </button>

            <h3>Members:</h3>
            {team.players && team.players.length > 0 ? (
                <ul>
                    {team.players.map(member => (
                        <li key={member.id}>{member.firstName} {member.lastName}</li>
                    ))}
                </ul>
            ) : (
                <p>No members in this team.</p>
            )}
        </div>
    );
};

export default TeamDetail;
