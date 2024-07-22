import axios from 'axios';

const API_URL = 'http://localhost:9191/api/cart/v1/';
 const API_BASE_URL ='http://localhost:9191/api/user/v1/';

export const getPurchasedProductsByUserId = async (user_id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_BASE_URL}${user_id}/purchases`, {
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

// Function to fetch all cart items for a specific cart ID
export const getCartItems = async (cart_id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_URL}${cart_id}`, {

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
export const getCartItemsByUserId = async (user_id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_URL}$cart?user_id=${user_id}`, {
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
// Function to create a new cart item, accessible by users
export const addCartItem = async (cartItem) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.post(API_URL, cartItem, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to add cart item:', error.response?.data || error.message);
        throw error;
    }
};

// Function to update a cart item by ID, accessible by users
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

// Function to delete a cart item by ID, accessible by users
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
