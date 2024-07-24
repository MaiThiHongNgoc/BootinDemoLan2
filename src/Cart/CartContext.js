import React, { createContext, useState, useCallback } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartUpdated, setCartUpdated] = useState(false);

    const updateCart = useCallback(() => {
        setCartUpdated(prev => !prev);
    }, []);

    return (
        <CartContext.Provider value={{ cartUpdated, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};
