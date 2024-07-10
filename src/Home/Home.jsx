import React from "react";
import {Link} from "react-router-dom"

const Home = () => {
    return (
        <>
            <h1>This is the Home Page</h1>

            <div style={{
                display:'flex',
                flexDirection:'column'
            }}>
                <Link to={'/leagues'}>Leagues</Link>
                <Link to={'/teams'}>Teams</Link>
                <Link to={'/users'}>Users</Link>
            </div>
        </>
    )
}

export default Home