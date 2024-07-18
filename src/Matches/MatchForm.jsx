import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const MatchForm = () => {
  const INITIAL_STATE = {
    eventLocation: "",
    eventType: "",
    participant1: "",
    participant2: "",
    participant1Score: "",
    participant2Score: ""
  };

  const { leagueId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const league = await LeagueOneApi.getLeagueById(leagueId);
        if (league && league.teams) {
          setTeams(league.teams);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError("Failed to fetch teams");
      }
    };

    fetchTeams();
  }, [leagueId]);

  console.log("Teams:", teams)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { team1, team2, team1Score, team2Score, eventLocation, eventType } = formData;

    const matchData = {
      leagueId: parseInt(leagueId, 10),
      eventLocation,
      eventType,
      team1: parseInt(team1, 10),
      team2: parseInt(team2, 10),
      team1Score: parseInt(team1Score, 10),
      team2Score: parseInt(team2Score, 10)
    };

    try {
      let res = await LeagueOneApi.createMatch(leagueId, matchData);
      if (res && res.id) {
        navigate(`/leagues/${leagueId}/matches/${res.id}`);
      } else {
        setError("Failed to create match");
      }
    } catch (err) {
      console.error("Error creating match:", err);
      setError(
        err.response?.data?.error || err.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventType">Event Type:</label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          required
        >
          <option value="">Select Event Type</option>
          <option value="Friendly">Friendly</option>
          <option value="League">League</option>
          <option value="Tournament">Tournament</option>
          <option value="Final">Final</option>
        </select>

        <label htmlFor="eventLocation">Event Location:</label>
        <input
          type="text"
          id="eventLocation"
          name="eventLocation"
          value={formData.eventLocation}
          onChange={handleChange}
          required
        />

        <label htmlFor="team1">Home Team:</label>
        <select
          id="team1"
          name="team1"
          value={formData.team1}
          onChange={handleChange}
          required
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <label htmlFor="team2">Away Team:</label>
        <select
          id="team2"
          name="team2"
          value={formData.team2}
          onChange={handleChange}
          required
        >
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>

        <label htmlFor="team1Score">Home Score:</label>
        <input
          type="number"
          id="team1Score"
          name="team1Score"
          value={formData.team1Score}
          onChange={handleChange}
          required
        />

        <label htmlFor="team2Score">Away Score:</label>
        <input
          type="number"
          id="team2Score"
          name="team2Score"
          value={formData.team2Score}
          onChange={handleChange}
          required
        />

        {error && <p>{error}</p>}

        <button type="submit">Create Match</button>
      </form>
    </div>
  );
};

export default MatchForm;
