import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamForm = () => {
    const INITIAL_STATE = {
        name: "",
        password: "",
        maxPlayers: 20,
        leagueId: "" // Changed from league to leagueId
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === "maxPlayers" || name === "leagueId") {
            updatedValue = parseInt(value, 10) || ""; // Ensure integer conversion, fallback to empty string if NaN
        }

        setFormData((f) => ({
            ...f,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            let res = await LeagueOneApi.createTeam(formData);
            if (res && res.id) {
                navigate(`/teams/${res.id}`);
            } else {
                setError(["Failed to create team"]);
            }
        } catch (err) {
            setError([err.message || "Something went wrong"]);
        }
    };

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
            <label htmlFor="maxPlayers">Max Players:</label>
            <input
                type="number"
                id="maxPlayers"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
            />
            <label htmlFor="leagueId">League ID:</label>
            <input
                type="number" // Changed from text to number
                id="leagueId"
                name="leagueId"
                value={formData.leagueId}
                onChange={handleChange}
            />
            {error.length > 0 && <p>{error}</p>}
            <button type="submit">Create Team</button>
        </form>
        </div>
    );
};

export default TeamForm
