import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const TeamDetail = () => {
    const {currentUser} = useContext(UserContext)
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

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

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteTeam(teamId);
            navigate(`/users/${currentUser.username}`);
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    };

    if (!team) return <div>Loading...</div>;

    console.log("Team Details:",team)

    return (
        <div className="container">
            <h2>{team.name}</h2>
            <p>{team.description}</p>
            <p>Max Players: {team.maxPlayers}</p>
            <h3>Admin:<Link to={`/users/${team.admin.username}`}>{team.admin.firstName} {" "} {team.admin.lastName}</Link></h3>
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

            <h3>Leagues Joined:</h3>
            {team.leagues && team.leagues.length > 0 ? (
                <ul className="list">
                    {team.leagues.map(league => (
                        <li key={league.id}>{league.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No leagues found</p>
            )}
            <div className="actions">
            <Link className="button" to={`/teams/${teamId}/join`}>Join Team</Link>
                {(currentUser.isTeamAdmin && currentUser.id === team.admin.id) && (
                    <>
                    <Link className="button" to={`/teams/${teamId}/update`}>Update Team</Link>
                    <button className="button" onClick={handleDelete}>Delete Team</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamDetail;
