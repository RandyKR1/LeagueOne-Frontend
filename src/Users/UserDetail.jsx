import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const UserDetail = () => {
    const { currentUser } = useContext(UserContext);
    const { username } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUser = async () => {
            let user = await LeagueOneApi.getUserByUsername(username);
            setUser(user);
        };

        getUser();
    }, [username]);

    if (!user) return <div>Loading...</div>;

    console.log(user.teams)

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
                    {team.name}
                    <br />
                  </li>
                ))}
              </ul>
            ) : (
              <p>No teams joined yet!</p>
            )}
          </div>
    
          {currentUser && (
            <div className="actions">
              <Link className="button" to={`/users/${currentUser.username}/update`}>Update User</Link>
            </div>
          )}
        </div>
      );
};

export default UserDetail;
