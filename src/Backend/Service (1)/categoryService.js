import axios from 'axios';

const API_URL = 'http://localhost:9191/api/categories/v1/';

// Function to retrieve all categories
const getCategories = async () => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;

    try {
       

        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch categories', error);
        throw error;
    }
};

// Function to retrieve a specific category by ID
const getCategoryById = async (id) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;

    try {
        if (role !== 'ADMIN') {
            throw new Error(`Unauthorized: Only admins can get category ${id}.`);
        }

        const response = await axios.get(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch category with id ${id}`, error);
        throw error;
    }
};

// Function to create a new category
const createCategory = async (category) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can create categories.');
        }

        const response = await axios.post(API_URL, category, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create category', error);
        throw error;
    }
};

// Function to update an existing category by ID
const updateCategory = async (id, category) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error(`Unauthorized: Only admins can update category ${id}.`);
        }

        const response = await axios.put(`${API_URL}${id}`, category, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(`Failed to update category with id ${id}`, error);
        throw error;
    }
};

// Function to delete a category by ID
const deleteCategory = async (id) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;

    try {
        if (role !== 'ADMIN') {
            throw new Error(`Unauthorized: Only admins can delete category ${id}.`);
        }

        await axios.delete(`${API_URL}${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(`Failed to delete category with id ${id}`, error);
        throw error;
    }
};

export {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
