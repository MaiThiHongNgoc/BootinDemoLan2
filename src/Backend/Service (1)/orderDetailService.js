import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:9191/api/orderdetail/v1/'; // Use environment variable

const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        return payload;
    } catch (error) {
        throw new Error('Failed to decode token.');
    }
};

const checkAdminRole = (role) => {
    if (role !== 'ADMIN' && role !== 'USER') {
        throw new Error('Unauthorized: Only admins and users can access this resource.');
    }
};

const getOrderDetails = async (page) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    const payload = decodeToken(token);
    const role = payload.scope;

    try {
        checkAdminRole(role);

        const response = await axios.get(`${API_URL}?p=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error('Failed to fetch order details:', error.response?.data || error.message);
        throw error;
    }
};

const createOrderDetail = async (orderDetail) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.post(API_URL, orderDetail, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create order detail:', error.response?.data || error.message);
        throw error;
    }
};

const updateOrderDetail = async (orderDetail) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    if (!orderDetail.order_detail_id) throw new Error('Order detail ID is required for updating.');

    try {
        const response = await axios.put(`${API_URL}${orderDetail.order_detail_id}`, orderDetail, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update order detail:', error.response?.data || error.message);
        throw error;
    }
};

const deleteOrderDetail = async (order_detail_id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        await axios.delete(`${API_URL}${order_detail_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Failed to delete order detail:', error.response?.data || error.message);
        throw error;
    }
};

const getOrderDetailById = async (order_detail_id) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');

    try {
        const response = await axios.get(`${API_URL}${order_detail_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch order detail by ID:', error.response?.data || error.message);
        throw error;
    }
};


export { getOrderDetails, createOrderDetail, updateOrderDetail, deleteOrderDetail,getOrderDetailById };
