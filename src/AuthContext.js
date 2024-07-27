import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // Track pending actions
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUserId = localStorage.getItem('user_id');
      setUserId(storedUserId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    if (pendingAction) {
      pendingAction();
      setPendingAction(null); // Clear the pending action
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(null); // Clear userId on logout
  };

  const addPendingAction = (action) => {
    setPendingAction(() => action);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, addPendingAction, userId }}>
      {children}
    </AuthContext.Provider>
  );
};
