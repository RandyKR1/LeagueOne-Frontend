import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamJoin = () => {
  const { teamId } = useParams();
  const INITIAL_STATE = { password: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState([]);
  const [message, setMessage] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const team = await LeagueOneApi.getTeamById(teamId);
      setTeamMembers(team.players);
    };
    fetchTeamMembers();
  }, [teamId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError([]);
    console.log("Submitting form data:", formData);

    try {
      let res = await LeagueOneApi.joinTeam(teamId, formData);
      console.log("API Response:", res);
      if (res && res.message) {
        setMessage(res.message);
        setTeamMembers(res.team.players); // Update team members
        navigate(`/teams/${teamId}`); // Redirect to the team page
      } else {
        setError(["Failed to join team"]);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError([err.message || "Something went wrong"]);
    }
  };

  return (
    <div className='container'>
      <h2>Join Team</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Join Team</button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        
      </div>
    </div>
  );
};

export default TeamJoin;
