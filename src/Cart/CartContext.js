import React, { createContext, useState, useCallback, useContext } from 'react';
import {mergeProducts} from './productUtils';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [cartUpdated, setCartUpdated] = useState(false);

    const updateCart = useCallback((items) => {
        setCartItems(items);
        setCartUpdated(prev => !prev);
    }, []);

    const { totalQuantity, totalPrice } = React.useMemo(() => {
        const { totalQuantity, totalPrice } = mergeProducts(cartItems);
        return { totalQuantity, totalPrice };
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, updateCart, cartUpdated, totalQuantity, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
