import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";
import UserContext from "../Auth/UserContext";

const LeagueJoinForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  const INITIAL_STATE = {
    password: "",
    teamId: "", // To store selected team ID
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [teams, setTeams] = useState([]);
  const [league, setLeague] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const league = await LeagueOneApi.getLeagueById(id);
        setLeague(league);
      } catch (err) {
        setError(err.message || "Failed to fetch league.");
      }
    };

    fetchLeague();
  }, [id]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        if (currentUser) {
          const res = await LeagueOneApi.getTeamsForAdmin(currentUser.id);
          setTeams(res || []); // Adjust based on actual response structure
        }
      } catch (err) {
        setError(err.message || "Failed to fetch teams.");
      }
    };

    fetchTeams();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Form Data:`, formData); // Log form data before sending request
    try {
      const res = await LeagueOneApi.joinLeague(id, formData);
      if (res && res.message) {
        navigate(`/leagues/${id}`);
      } else {
        setError("Failed to join league. Check your password.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="container">
      <h2>Join League</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="teamId">Select Your Team:</label>
        <select
          id="teamId"
          name="teamId"
          value={formData.teamId}
          onChange={handleChange}
          required
        >
          <option value="">Select a Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>{team.name}</option>
          ))}
        </select>
        <label htmlFor="password">League Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Join League</button>
      </form>
    </div>
  );
};

export default LeagueJoinForm;
