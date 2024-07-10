import React, { useEffect, useState } from "react";
import LeagueOneApi from "../api";
import {useParams} from "react-router-dom"

const MatchDetail = () => {
  const { leagueId, matchId } = useParams(); // Ensure you import useParams from react-router-dom
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await LeagueOneApi.getMatch(leagueId, matchId); // Pass leagueId and matchId to API call
        setMatch(res);
      } catch (error) {
        console.error("Error fetching match:", error);
      }
    };

    fetchMatch();
  }, [leagueId, matchId]);

  console.log(`League ID: ${leagueId}, Match ID: ${matchId}`)

  if (!match) {
    return <p>Loading...</p>; // Optional: Add loading indicator while waiting for API response
  }

  return (
    <div>
      <h1>Match Detail</h1>
      <p>Event Name: {match.eventName}</p>
      <p>Event Location: {match.eventLocation}</p>
      <p>Event Results: {match.eventResults}</p>
      {/* Render other match details as needed */}
    </div>
  );
};

export default MatchDetail;
