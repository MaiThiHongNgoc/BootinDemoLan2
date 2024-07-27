import axios from 'axios';

const API_URL2 = 'http://localhost:9191/api/cartitems/v1/';

export const addProductToCart = async (cartId, product_id, quantity, token) => {
    try {
        const response = await axios.post(`${API_URL2}`, {
            cart: {
                cart_id: cartId  // Ensure backend expects 'cart_id' inside 'cart'
            },
            product: {
                product_id: product_id  // Ensure backend expects 'product_id' inside 'product'
            },
            quantity: quantity // Send the quantity
            }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error.response?.data || error.message);
        throw error;
    }
};
  
 

// Update a cart item by ID
export const updateCartItem = async (id, updatedItem) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.put(`${API_URL2}${id}`, updatedItem, {
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
        const response = await axios.delete(`${API_URL2}${id}`, {
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
