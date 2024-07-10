import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueOneApi from "../api";

const LegaueUpdateForm = () => {
    const INITIAL_STATE = {
        name: "",
        description: "",
        maxTeams: "",
        password: ""
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [league, setLeague] = useState(null);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);


    
    useEffect(() => {
        const fetchLeague = async () => {
            try {
                const fetchedLeague = await LeagueOneApi.getLeagueById(id);
                setLeague(fetchedLeague);
                setFormData({
                    name: fetchedLeague.name,
                    description: fetchedLeague.description,
                    maxTeams: fetchedLeague.maxTeams.toString(),
                    password: "" // Optionally include password update logic
                });
            } catch (error) {
                console.error("Error fetching league:", error);
                setError("Failed to fetch league data");
            }
        };
        fetchLeague();
    }, [id]);

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

        // Check if the password field is empty
        const updatedPassword = formData.password.trim() === "" ? league.password : formData.password;


        console.log("Submitting with formData:", formData);
    
        // Parse maxTeams to ensure it's an integer
        const parsedMaxTeams = parseInt(formData.maxTeams, 10);
    
        try {
            const updatedLeague = await LeagueOneApi.updateLeague(id, {
                ...formData,
                maxTeams: parsedMaxTeams,
                password: updatedPassword
            });
            console.log("League updated:", updatedLeague);
            navigate(`/leagues/${id}`); // Redirect to league detail page after update
        } catch (error) {
            console.error("Error updating league:", error);
            setError("Failed to update league");
        }
    };
    
    

    if (!league) {
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
            <button type="submit">Update League</button>
        </form>
    );
};

export default LegaueUpdateForm;
