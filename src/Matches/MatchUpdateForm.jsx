import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const MatchUpdateForm = () => {
    const INITIAL_STATE = {
        eventName: "",
        eventLocation: "",
        eventType: "",
        eventResults: "",
        creatorId: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { leagueId, matchId } = useParams(); // Pulls leagueId and matchId from the URL

    // Fetch existing match data on component mount
    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const match = await LeagueOneApi.getMatch(leagueId, matchId);
                setFormData({
                    eventName: match.eventName,
                    eventLocation: match.eventLocation,
                    eventType: match.eventType,
                    eventResults: match.eventResults || "",
                    creatorId: match.creatorId.toString()
                });
            } catch (err) {
                console.error("Error fetching match:", err);
                setError("Failed to fetch match data");
            }
        };

        fetchMatch();
    }, [matchId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === "creatorId" ? parseInt(value, 10) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, creatorId: parseInt(formData.creatorId, 10) };
            console.log("Submitting form with payload:", payload);
            const updatedMatch = await LeagueOneApi.updateMatch(leagueId, matchId, payload);
            navigate(`/leagues/${leagueId}/matches/${matchId}`); // Navigate to the match detail page with the correct matchId
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Something went wrong");
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
    
            <label htmlFor="team1">Home Score:</label>
            <input
              type="number"
              id="team1"
              name="team1"
              value={formData.team1}
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

export default MatchUpdateForm;
