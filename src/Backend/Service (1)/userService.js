import axios from 'axios';

const API_URL = 'http://localhost:9191/api/user/v1/'; 

const getUsers = async () => {
    const token = localStorage.getItem('token');

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can access user data.');
        }
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error.response?.data || error.message);
        throw error;
    }
};


const createUser = (user) => {
    const token = localStorage.getItem('token');

    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can access user data.');
        }
        const response = axios.post(API_URL, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch users:', error.response?.data || error.message);
        throw error;
    }
};

const updateUser = async (user) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can create categories.');
        }

        const response = await axios.put(`${API_URL}${user.user_id}`, user, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete user with ID ${userId}', error);
        throw error;
    }
};

const deleteUser = async (user_id) => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can create categories.');
        }

        const response = await axios.delete(`${API_URL}${user_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete user with ID ${userId}', error);
        throw error;
    }
};

export { getUsers, createUser, updateUser, deleteUser };
