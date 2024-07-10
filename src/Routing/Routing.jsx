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
import TeamList from "../Teams/TeamList";
import TeamDetail from "../Teams/TeamDetail";
import TeamForm from "../Teams/TeamForm";
import TeamUpdateForm from "../Teams/TeamUpdateForm";
import UserList from "../Users/UserList";
import UserDetail from "../Users/UserDetail";
import UserUpdateForm from "../Users/UserUpdateForm";

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/leagues" element={<LeagueList />} />
                <Route path="/leagues/:id" element={<LeagueDetail />} />
                <Route path="/leagues/create" element={<LeagueForm />} />
                <Route path="/leagues/:id/update" element={<LegaueUpdateForm />} />
                <Route path="/leagues/:leagueId/matches" element={<MatchList />} />
                <Route path="/leagues/:leagueId/matches/:matchId" element={<MatchDetail />} />
                <Route path="/leagues/:leagueId/matches/create" element={<MatchForm />} />
                <Route path="/leagues/:leagueId/matches/:matchId/update" element={<MatchUpdateForm />} />
                <Route path="/teams" element={<TeamList />} />
                <Route path="/teams/:teamId" element={<TeamDetail />} />
                <Route path="/teams/create" element={<TeamForm />}/>
                <Route path="/teams/:teamId/update" element={<TeamUpdateForm />}/>
                <Route path="/users" element={<UserList />}/>
                <Route path="/users/:username" element={<UserDetail />} />
                <Route path="/users/:username/update" element={<UserUpdateForm />} />

            </Routes>
        </>
    )
}

export default Routing