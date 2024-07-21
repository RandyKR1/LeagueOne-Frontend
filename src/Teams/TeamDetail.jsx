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
            <h1>{team.name}</h1>
            <p>Max Players: {team.maxPlayers}</p>
            <h2>Admin: <Link to={`/users/${team.admin.username}`}>{team.admin.firstName} {" "} {team.admin.lastName}</Link></h2>
            <h2>Members:</h2>
            {team.players && team.players.length > 0 ? (
                <ul className="list">
                    {team.players.map(member => (
                        <li key={member.id}>{member.firstName} {member.lastName}</li>
                    ))}
                </ul>
            ) : (
                <p>No members in this team.</p>
            )}

            <h2>Leagues Joined:</h2>
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
                    <button className="button-delete" onClick={handleDelete}>Delete Team</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TeamDetail;
