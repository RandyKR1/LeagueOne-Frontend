import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserApi from "../api";

const UserUpdateForm = () => {
    const INITIAL_STATE = {
        firstName: "",
        lastName: "",
        email: "",
        bio: ""
    };

    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState(INITIAL_STATE);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUser = await UserApi.getUserByUsername(username);
                setUser(fetchedUser);
                setFormData({
                    firstName: fetchedUser.firstName,
                    lastName: fetchedUser.lastName,
                    email: fetchedUser.email,
                    bio: fetchedUser.bio || ""
                });
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Failed to fetch user data");
            }
        };
        fetchUser();
    }, [username]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await UserApi.updateUser(username, formData);
            console.log("User updated:", updatedUser);
            navigate(`/users/${username}`); // Redirect to user detail page after update
        } catch (error) {
            console.error("Error updating user:", error);
            setError("Failed to update user");
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
            />
            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <label htmlFor="bio">Bio:</label>
            <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
            />
            {error && <p>{error}</p>}
            <button type="submit">Update User</button>
        </form>
        </div>
    );
};

export default UserUpdateForm;
