// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { getPurchasedProductsByUserId } from './Backend/Service (1)/cartService';
import { mergeProducts } from './Cart/productUtils'; // Adjust path accordingly

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cart, setCart] = useState({ totalQuantity: 0, products: [] });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const storedUserId = localStorage.getItem('user_id');
      setUserId(storedUserId);
      fetchCartDetails(storedUserId);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchCartDetails = async (userId) => {
    try {
      const data = await getPurchasedProductsByUserId(userId);
      if (Array.isArray(data) && data.length > 0) {
        const cartData = data[0];
        const { totalQuantity, mergedProducts } = mergeProducts(cartData.cart_Product || []);
        setCart({ totalQuantity, products: mergedProducts });
      } else {
        setCart({ totalQuantity: 0, products: [] });
      }
    } catch (error) {
      console.error('Failed to fetch cart details', error);
      setCart({ totalQuantity: 0, products: [] });
    }
  };

  const updateCart = async () => {
    if (userId) {
      await fetchCartDetails(userId);
    }
  };

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
    fetchCartDetails(storedUserId); // Fetch cart details on login
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserId(null);
    setCart({ totalQuantity: 0, products: [] }); // Clear cart on logout
  };

  const addPendingAction = (action) => {
    setPendingAction(() => action);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, addPendingAction, userId, cart, updateCart }}>
      {children}
    </AuthContext.Provider>
  );
};
