import React from "react";
import "./Alert.css"

const Alert = ({ messages = [] }) => {
    return (
        <div className="alert-container">
            {messages.map((error, index) => (
                <p key={index} className="alert-message">
                    {error}
                </p>
            ))}
        </div>
    );
};

export default Alert;
