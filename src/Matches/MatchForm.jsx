import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const MatchForm = () => {
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
    const { leagueId } = useParams();  // Pulls leagueId from the URL
    console.log("League ID from URL:", leagueId);

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
            let res = await LeagueOneApi.createMatch(leagueId, payload);
            if (res && res.id) {
                navigate(`/leagues/${leagueId}/matches/${res.id}`);
            } else {
                setError("Failed to create match");
            }
        } catch (err) {
            console.error("Error creating match:", err);
            setError(err.response?.data?.error || err.message || "Something went wrong");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="eventName">Event Name:</label>
            <input
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
            />

            <label htmlFor="eventLocation">Event Location:</label>
            <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                value={formData.eventLocation}
                onChange={handleChange}
                required
            />

            <label htmlFor="eventType">Event Type:</label>
            <input
                type="text"
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
            />

            <label htmlFor="eventResults">Event Results:</label>
            <textarea
                id="eventResults"
                name="eventResults"
                value={formData.eventResults}
                onChange={handleChange}
            />

            <label htmlFor="creatorId">Creator ID:</label>
            <input
                type="number"
                id="creatorId"
                name="creatorId"
                value={formData.creatorId}
                onChange={handleChange}
                required
            />

            {error && <p>{error}</p>}

            <button type="submit">Create Match</button>
        </form>
    );
};

export default MatchForm;
