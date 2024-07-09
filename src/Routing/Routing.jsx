import React from "react";
import {Routes, Route} from "react-router-dom";
import Leagues from "../Leagues/Leagues";
import Matches from "../Matches/Matches";

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/leagues" element={<Leagues />} />
                <Route path="/leagues/:leagueId/matches" element={<Matches />} />
            </Routes>
        </>
    )
}

export default Routing