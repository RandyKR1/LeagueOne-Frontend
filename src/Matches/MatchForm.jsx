import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LeagueOneApi from "../api";

const MatchForm = () => {
    const INITIAL_STATE = {
        eventLocation: "",
        eventType: "",
        eventCompetition: "",
        eventParticipants: "",
        eventResults: "",
        eventDate: "",
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
          // Ensure leagueId is included in the form data
          const finalData = { ...formData, leagueId: parseInt(leagueId, 10) };
          console.log('final data:', finalData)
          let res = await LeagueOneApi.createMatch(leagueId, finalData);
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
        <div className="container">
        <form onSubmit={handleSubmit}>  


          <label htmlFor="eventType">Event Type:</label>
          <select
            id="eventType"
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
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
    


          <label htmlFor="eventCompetition">Event Competition:</label>
          <select
            id="eventCompetition"
            name="eventCompetition"
            value={formData.eventCompetition}
            onChange={handleChange}
          >
            <option value="">Select Competition</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Hockey">Hockey</option>
            <option value="Basketball">Basketball</option>
            <option value="Tennis">Tennis</option>
            <option value="Golf">Golf</option>
            <option value="Baseball">Baseball</option>
            <option value="Other">Other</option>
          </select>
    


          <label htmlFor="eventParticipants">Event Participants:</label>
            <input
            type="text"
            id="eventParticipants"
            name="eventParticipants"
            value={formData.eventParticipants}
            onChange={handleChange}
            />
        


          <label htmlFor="eventResults">Event Results:</label>
            <input
                type="text"
                id="eventResults"
                name="eventResults"
                value={formData.eventResults}
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
