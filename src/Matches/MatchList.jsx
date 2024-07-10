import { useEffect, useState } from "react";
import LeagueOneApi from "../api";
import {Link} from "react-router-dom"

const MatchList = ({ leagueId }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        let res = await LeagueOneApi.getMatches(leagueId); // Pass leagueId here
        setMatches(res);
      } catch (e) {
        console.error(e);
      }
    };
    fetchMatches();
  }, [leagueId]);

  console.log(matches)
  return (
    <>
      <h1>Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            <Link to={`/leagues/${leagueId}/matches/${match.id}`}>
                {match.eventName}
            </Link>

            {match.eventLocation}
            {match.eventResults}
            {match.teams}
        </li>
        ))}
      </ul>
      <button>
        <Link to={`/leagues/${leagueId}/matches/create`}>Create A Match</Link> 
      </button>
    </>
  );
};

export default MatchList;
