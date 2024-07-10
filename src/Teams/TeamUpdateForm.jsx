import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const TeamUpdateForm = () => {
    const INITIAL_STATE = {
        name: "",
        password: "",
        maxPlayers: ""
    };

    const { teamId } = useParams();
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const fetchedTeam = await LeagueOneApi.getTeamById(teamId);
                setTeam(fetchedTeam);
                setFormData({
                    name: fetchedTeam.name,
                    maxPlayers: fetchedTeam.maxPlayers.toString(),
                    password: "" // Optionally include password update logic
                });
            } catch (error) {
                console.error("Error fetching team:", error);
                setError("Failed to fetch team data");
            }
        };
        fetchTeam();
    }, [teamId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Ensure maxPlayers is parsed as an integer
        const updatedValue = name === "maxPlayers" ? parseInt(value) : value;
        
        setFormData((f) => ({
            ...f,
            [name]: updatedValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting with formData:", formData);
    
        // Parse maxTeams to ensure it's an integer
        const parsedMaxPlayers = parseInt(formData.maxPlayers, 10);

        // Check if the password field is empty
        const updatedPassword = formData.password.trim() === "" ? team.password : formData.password;

        try {
            const updatedTeam = await LeagueOneApi.updateTeam(teamId, {
                ...formData,
                maxPlayers: parsedMaxPlayers,
                password: updatedPassword
            });
            console.log("Team updated:", updatedTeam);
            navigate(`/teams/${teamId}`); // Redirect to team detail page after update
        } catch (error) {
            console.error("Error updating team:", error);
            setError("Failed to update team");
        }
    };

    if (!team) {
        return <div>Loading...</div>;
    }

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
            <label htmlFor="maxPlayers">Max Players:</label>
            <input
                type="number"
                id="maxPlayers"
                name="maxPlayers"
                value={formData.maxPlayers}
                onChange={handleChange}
            />
            {error && <p>{error}</p>}
            <button type="submit">Update Team</button>
        </form>
    );
};

export default TeamUpdateForm;
