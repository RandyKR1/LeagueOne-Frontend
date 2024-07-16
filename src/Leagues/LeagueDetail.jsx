import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const LeagueDetail = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [teams, setTeams] = useState([]); // Ensure teams is initialized as an empty array
    const [error, setError] = useState(null);
    const { currentUser } = useContext(UserContext);
    const [loadingLeague, setLoadingLeague] = useState(true); 

   
    useEffect(() => {
        const getLeagueById = async () => {
            try {
                setLoadingLeague(true);
                const leagueData = await LeagueOneApi.getLeagueById(id);
                setLeague(leagueData);
                setLoadingLeague(false);
            } catch (err) {
                setError(err);
                setLoadingLeague(false);
            }
        };
        getLeagueById();
    }, [id]);


  

    if (error) return <div>Error loading league details: {error.message}</div>;

    if (!league) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{league.name}</h2>
            <p>{league.description}</p>
            <p>Max Teams: {league.maxTeams}</p>
            <p>League Admin: {league.admin.id}</p>

            <div className="actions">
                <Link className="button" to={`/leagues/${league.id}/matches`}>View Matches</Link>
                {currentUser.isTeamAdmin && (
                    <Link className="button" to={`/leagues/${league.id}/join`}>Join League</Link>
                )}
                {currentUser.isLeagueAdmin && (
                    <Link className="button" to={`/leagues/${league.id}/update`}>Update League</Link>
                )}
            </div>

            <div className="teams-list">
                <h3>Teams in {league.name}:</h3>
                {league.teams && league.teams.length > 0 ? (
                <ul className="list">
                    {league.teams.map(team => (
                        <li key={team.id}>{team.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No members in this team.</p>
        )}
            </div>
        </div>
    );
};

export default LeagueDetail;
