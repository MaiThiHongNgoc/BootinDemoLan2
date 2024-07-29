import React from 'react';
import './LogOut.css'

// Define the logout function to clear local storage
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user_id');
};

const Logout = () => {
  const handleLogout = () => {
    logout(); // Call the logout function
    window.location.href = '/login'; // Redirect to the login page
  };

  return (
    <p className="logout-button" onClick={handleLogout} > Logout </p>
  );
};

export default Logout;
