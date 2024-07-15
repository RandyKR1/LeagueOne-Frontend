import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const UserDetail = () => {
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

    return (
        <div className="container">
            <h2>{user.firstName} {user.lastName}</h2>
            <div>
                <h3>{user.username}</h3>
                <h3>{user.email}</h3>
            </div>
        </div>
    );
};

export default UserDetail;
