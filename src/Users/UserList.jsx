import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LeagueOneApi from "../api";


const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                let res = await LeagueOneApi.getUsers({}); // {} for filters
                setUsers(res);
            } catch (e) {
                console.error(e);
            }
        };
        fetchUsers();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <div>
                <ul>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <li key={user.id}>
                                <Link to={`/users/${user.username}`}>
                                    <h3>{user.firstName}{" "}{user.lastName}</h3>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <p>No users found.</p>
                    )}
                </ul>
            </div>
        </>
    );
};

export default UserList;