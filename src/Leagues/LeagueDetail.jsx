import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";
import LeagueStandings from "./LeagueStandings"; // Import the LeagueStandings component

const LeagueDetail = () => {
    const { id } = useParams();
    const [league, setLeague] = useState(null);
    const [error, setError] = useState(null);
    const { currentUser } = useContext(UserContext);
    const [loadingLeague, setLoadingLeague] = useState(true); 
    const navigate = useNavigate()

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

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteLeague(id);
            navigate(`/users/${currentUser.username}`);
        } catch (error) {
            console.error("Error deleting team:", error);
        }
    };

    if (error) return <div>Error loading league details: {error.message}</div>;
    if (loadingLeague) return <div>Loading...</div>; // Use loadingLeague state here
    if (!league) return <div>League not found</div>;

    console.log(league)

    return (
        <div className="league-container">
            <div className="league-display-container">
            <h1>{league.name}</h1>
            <h2>{league.description}</h2>
            <h2>Admin: <Link to={`/users/${league.admin.username}`}>{league.admin.firstName} {" "} {league.admin.lastName}</Link></h2>
            <h3>Max Teams: {league.maxTeams}</h3>
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

            <div className="league-buttons">
                    <Link className="button" to={`/leagues/${league.id}/matches`}>View Matches</Link>
                {currentUser.isTeamAdmin && (
                    <Link className="button" to={`/leagues/${league.id}/join`}>Join League</Link>
                )} 
                {(currentUser.isLeagueAdmin && currentUser.id === league.admin.id) && (
                    <>
                    <Link className="button" to={`/leagues/${league.id}/update`}>Update League</Link>
                    <button className="button-delete" onClick={handleDelete}>Delete League</button>
                    </>
                )}
            </div>
            </div>

            <div className="league-display-container">
                <LeagueStandings leagueId={id} />
            </div>
        </div>
    );
};

export default LeagueDetail;
