import { useEffect, useState } from "react";
import LeagueOneApi from "../api";

const Matches = ({ leagueId }) => {
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

  return (
    <>
      <h1>Matches</h1>
      <ul>
        {matches.map(match => (
          <li key={match.id}>
            {match.eventName}
            {match.eventLocation}
            {match.eventResults}
            {match.teams}
        </li>
        ))}
      </ul>
    </>
  );
};

export default Matches;
