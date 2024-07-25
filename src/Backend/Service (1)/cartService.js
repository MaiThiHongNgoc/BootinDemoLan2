import axios from 'axios';

const API_URL = 'http://localhost:9191/api/cart/v1/';

// Fetch purchased products by user ID
export const getPurchasedProductsByUserId = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_URL}${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get purchased products:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch all cart items for a specific cart ID
export const getCartItems = async (cartId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_URL}${cartId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get cart items:', error.response?.data || error.message);
        throw error;
    }
};

// Fetch cart items by user ID
export const getCartItemsByUserId = async (userId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_URL}${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get cart items:', error.response?.data || error.message);
        throw error;
    }
};

// Update a cart item by ID
export const updateCartItem = async (id, updatedItem) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.put(`${API_URL}${id}`, updatedItem, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update cart item ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Delete a cart item by ID
export const deleteCartItem = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.delete(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete cart item ${id}:`, error.response?.data || error.message);
        throw error;
    }
};
