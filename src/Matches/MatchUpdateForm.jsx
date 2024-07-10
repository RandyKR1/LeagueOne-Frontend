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
    console.log(
            "League ID from URL:", leagueId,
            "Match ID from URL:", matchId
        );

    // Fetch existing match data on component mount
    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const match = await LeagueOneApi.getMatch(matchId);
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
            await LeagueOneApi.updateMatch(leagueId, matchId, payload);
            navigate(`/leagues/${leagueId}/matches/${res.id}`);
        } catch (err) {
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

            <button type="submit">Update Match</button>
        </form>
    );
};

export default MatchUpdateForm;
