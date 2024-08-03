import axios from 'axios';

const API_URL = 'http://localhost:9191/api/products/v1/';


export const getProducts = async (page = 0, productsPerPage = 10) => {
    try {
        const response = await axios.get(`${API_URL}?p=${page}&size=${productsPerPage}`);
        return response.data;
    } catch (error) {
        console.error('Failed to get products:', error.response?.data || error.message);
        throw error;
    }
};


// Function to create a new product, only accessible to admins
export const createProduct = async (productData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;

    try {
        // Check if the user has admin role
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can create products.');
        }

        const response = await axios.post(API_URL, productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create product:', error.response?.data || error.message);
        throw error;
    }
};

// Function to update a product by ID, only accessible to admins
export const updateProduct = async (id, productData) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;

    try {
        // Check if the user has admin role
        if (role !== 'ADMIN') {
            throw new Error(`Unauthorized: Only admins can update product ${id}.`);
        }

        const response = await axios.put(`${API_URL}${id}`, productData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update product ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Function to delete a product by ID, only accessible to admins
export const deleteProduct = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;

    try {
        // Check if the user has admin role
        if (role !== 'ADMIN') {
            throw new Error(`Unauthorized: Only admins can delete product ${id}.`);
        }

        const response = await axios.delete(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to delete product ${id}:`, error.response?.data || error.message);
        throw error;
    }
};

// Get product details by ID
export const getProductById = async (id) => {
    try {
      const response = await axios.get(`${API_URL}${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to get product ${id}:`, error.response?.data || error.message);
      throw error;
    }
  };
  
  // Search for products by name
  export const searchProducts = async (searchQuery) => {
    try {
      const response = await axios.get(`${API_URL}?search=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to search products:`, error.response?.data || error.message);
      throw error;
    }
  };