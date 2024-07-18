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
    <div className="container">
      <h1>Matches</h1>
      {matches.length > 0 ? (
        <ul className="list">
          {matches.map((match) => (
            <li key={match.id}>
              <p>{match.participant1.name} vs {match.participant2.name}</p>
              <p>{match.eventLocation}</p>
              <p>Event Results: {match.participant1.name}: {match.participant1Score} vs {match.participant2.name}: {match.participant2Score}</p>
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
