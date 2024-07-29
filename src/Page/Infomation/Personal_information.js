import React, { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "../../Backend/User/UserForm";
import './PersonalInformation.css'; // Import the CSS file

const PersonalInformation = () => {
    const [user, setUser] = useState(null); // Changed to a single user object
    const [loading, setLoading] = useState(true); // To manage loading state
    const [error, setError] = useState(null); // To manage errors
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Async function to fetch user information
    const fetchUserInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:9191/api/user/v1/myinfo`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(response.data); // Update state with user data
        } catch (err) {
            setError(err); // Update error state if any
        } finally {
            setLoading(false); // Set loading to false after completion
        }
    };

    useEffect(() => {
        fetchUserInfo(); // Call function to fetch data
    }, []); // Empty dependency array, effect runs once on mount

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        fetchUserInfo(); // Refetch user data after form is closed
    };

    if (loading) return <p>Loading...</p>; // Display loading message
    if (error) return <p>Error: {error.message}</p>; // Display error message if any

    return (
        <div className="btn-container">
            <h2>Personal Information</h2>
            {user ? (
                <div>
                    {showForm && (
                        <div className="user-form">
                            <UserForm user={editingUser} onSave={handleFormClose} />
                        </div>
                    )}
                    {/* Display user information here */}
                    <p>Name: {user.username}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone: {user.phone}</p>
                    <p>Created At: {user.created_at}</p>

                    {/* Add other user properties if available */}
                    <button className="user-list-button-edit" onClick={() => handleEdit(user)}>Edit</button>
                </div>
            ) : (
                <p>No user information available</p>
            )}
        </div>
    );
}

export default PersonalInformation;
