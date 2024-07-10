import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const LeagueForm = () => {
    const INITIAL_STATE = {
        name: "",
        description: "",
        maxTeams: "",
        password: ""
    };

    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Ensure maxTeams is parsed as an integer
        const updatedValue = name === "maxTeams" ? parseInt(value) : value;
        
        setFormData((f) => ({
            ...f,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await LeagueOneApi.createLeague(formData);
            if (res && res.id) {
                navigate(`/leagues/${res.id}`);
            } else {
                setError(["Failed to create league"]);
            }
        } catch (err) {
            setError([err.message || "Something went wrong"]);
        }
    };
    
    

    return (
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
            <label htmlFor="maxTeams">Max Teams:</label>
            <input
                type="number"
                id="maxTeams"
                name="maxTeams"
                value={formData.maxTeams}
                onChange={handleChange}
            />
            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />
            {error && <p>{error}</p>}
            <button type="submit">Create League</button>
        </form>
    );
};

export default LeagueForm;
