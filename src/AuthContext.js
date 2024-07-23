import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // Track pending actions

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    // Execute any pending action (e.g., add to cart)
    if (pendingAction) {
      pendingAction();
      setPendingAction(null); // Clear the pending action
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const addPendingAction = (action) => {
    setPendingAction(() => action);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, addPendingAction }}>
      {children}
    </AuthContext.Provider>
  );
};
