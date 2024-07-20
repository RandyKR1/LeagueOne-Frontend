import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const MatchList = () => {
  const [matches, setMatches] = useState([]);
  const { currentUser } = useContext(UserContext);
  const { leagueId } = useParams();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        let res = await LeagueOneApi.getMatches(leagueId);
        setMatches(res);
      } catch (e) {
        console.error(e);
      }
    };

    fetchMatches();
  }, [leagueId]);

  return (
    <div className="list-container">
      <h1>Matches</h1>
      {matches.length > 0 ? (
        <ul className="list">
          {matches.map((match) => (
            <li key={match.id}>
              <Link to={`/leagues/${leagueId}/matches/${match.id}`}>
                <p>{match.homeTeam.name} vs {match.awayTeam.name}</p>
                <p>{match.eventLocation}</p>
                <p>Event Results: {match.homeTeam.name}: {match.team1Score} vs {match.awayTeam.name}: {match.team2Score}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No matches yet!</p>
      )}
      {currentUser?.isLeagueAdmin && (
        <button>
          <Link to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link>
        </button>
      )}
    </div>
  );
};

export default MatchList;
