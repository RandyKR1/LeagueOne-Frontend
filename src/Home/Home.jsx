import React from "react";
import {Link} from "react-router-dom"

const Home = () => {
    return (
        <>
            <h1>This is the Home Page</h1>

            <div>
                <Link to={'/leagues'}>Leagues</Link>
            </div>
        </>
    )
}

export default Home