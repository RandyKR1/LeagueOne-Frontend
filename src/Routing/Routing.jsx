import React from "react";
import {Routes, Route} from "react-router-dom";
import LeagueList from "../Leagues/LeagueList";
import LeagueDetail from "../Leagues/LeagueDetail";
import Home from "../Home/Home";
import LeagueForm from "../Leagues/LeagueForm";
import LegaueUpdateForm from "../Leagues/LeagueUpdateForm";
import MatchDetail from "../Matches/MatchDetail";
import MatchList from "../Matches/MatchList";
import MatchForm from "../Matches/MatchForm";
import MatchUpdateForm from "../Matches/MatchUpdateForm";

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leagues" element={<LeagueList />} />
                <Route path="/leagues/:id" element={<LeagueDetail />} />
                <Route path="/leagues/:id/update" element={<LegaueUpdateForm />} />
                <Route path="/leagues/create" element={<LeagueForm />} />
                <Route path="/leagues/:leagueId/matches" element={<MatchList />} />
                <Route path="/leagues/:leagueId/matches/:matchId" element={<MatchDetail />} />
                <Route path="/leagues/:leagueId/matches/create" element={<MatchForm />} />
                <Route path="/leagues/:leagueId/matches/:matchId/update" element={<MatchUpdateForm />} />

            </Routes>
        </>
    )
}

export default Routing