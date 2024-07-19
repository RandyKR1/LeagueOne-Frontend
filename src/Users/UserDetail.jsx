import React, { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const UserDetail = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext); // assuming setCurrentUser is available in context
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            let user = await LeagueOneApi.getUserByUsername(username);
            setUser(user);
        };

        getUser();
    }, [username]);

    const handleDelete = async () => {
        try {
            await LeagueOneApi.deleteUser(username);
            setCurrentUser(null);
            navigate('/login');
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="container">
            <h2>{user.firstName} {user.lastName}</h2>
            <div className="details">
                <p>{user.username}</p>
                <p>{user.email}</p>
                <p>{user.bio}</p>
            </div>

            <div className="teams-list">
                <h3>Teams Joined</h3>
                {user.teams && user.teams.length > 0 ? (
                    <ul className="list">
                        {user.teams.map(team => (
                            <li key={team.id}>
                                <button className="button">
                                    <Link to={`/teams/${team.id}`}>
                                        {team.name}
                                    </Link>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No teams joined yet!</p>
                )}
            </div>

            <div className="teams-list">
                <h3>My Teams</h3>
                {user.administeredTeams && user.administeredTeams.length > 0 ? (
                    <ul className="list">
                        {user.administeredTeams.map(team => (
                            <li key={team.id}>
                                <button className="button">
                                    <Link to={`/teams/${team.id}`}>
                                        {team.name}
                                    </Link>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No teams created yet!</p>
                )}
            </div>

            <div className="teams-list">
                <h3>My Leagues</h3>
                {user.administeredLeagues && user.administeredLeagues.length > 0 ? (
                    <ul className="list">
                        {user.administeredLeagues.map(league => (
                            <li key={league.id}>
                                <button className="button">
                                    <Link to={`/leagues/${league.id}`}>
                                        {league.name}
                                    </Link>
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No leagues created yet!</p>
                )}
            </div>

            {currentUser.id === user.id && (
                <div className="actions">
                    <Link className="button" to={`/users/${currentUser.username}/update`}>Update User</Link>
                    <button className="button" onClick={handleDelete}>Delete User</button>
                </div>
            )}
        </div>
    );
};

export default UserDetail;
