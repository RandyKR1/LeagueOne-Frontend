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

    // IMPLEMENT SPINNER HERE
    if (!user) return <div>Loading...</div>;

    return (
        <>
            <div>
                <h2>{user.firstName}{" "}{user.lastName}</h2>
            </div>
        </>
    );
};

export default UserDetail;
