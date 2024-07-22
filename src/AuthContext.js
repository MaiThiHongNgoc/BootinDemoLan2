// AuthContext.js  
import React, { createContext, useState } from 'react';  

export const AuthContext = createContext();  

export const AuthProvider = ({ children }) => {  
    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const [user_id, setUserId] = useState(null);  
    const [cart_id, setCartId] = useState(null); 

    return (  
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user_id, setUserId, cart_id, setCartId }}>  
            {children}  
        </AuthContext.Provider>  
    );  
};