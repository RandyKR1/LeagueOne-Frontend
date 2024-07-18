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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { participant1, participant2, participant1Score, participant2Score, eventLocation, eventType } = formData;

    const matchData = {
      leagueId: parseInt(leagueId, 10),
      eventLocation,
      eventType,
      participant1: parseInt(participant1, 10),
      participant2: parseInt(participant2, 10),
      participant1Score: parseInt(participant1Score, 10),
      participant2Score: parseInt(participant2Score, 10)
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

        <label htmlFor="participant1">Participant 1:</label>
        <select
          id="participant1"
          name="participant1"
          value={formData.participant1}
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

        <label htmlFor="participant2">Participant 2:</label>
        <select
          id="participant2"
          name="participant2"
          value={formData.participant2}
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

        <label htmlFor="participant1Score">Participant 1 Score:</label>
        <input
          type="number"
          id="participant1Score"
          name="participant1Score"
          value={formData.participant1Score}
          onChange={handleChange}
          required
        />

        <label htmlFor="participant2Score">Participant 2 Score:</label>
        <input
          type="number"
          id="participant2Score"
          name="participant2Score"
          value={formData.participant2Score}
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
