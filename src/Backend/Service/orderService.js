import axios from 'axios';

const API_URL = 'http://localhost:9191/api/order/v1/';

const getOrder = () => {
    const token = localStorage.getItem('token');
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
        if (role !== 'ADMIN') {
            throw new Error('Unauthorized: Only admins can create orders.');
        }

        const response = axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create orders', error);
        throw error;
    }
}

const createOrder = (order) => axios.post(API_URL, order);

const updateOrder = (id, order) => axios.put(`${API_URL}${id}`, order);

const deleteOrder = (order_id) => axios.delete(`${API_URL}${order_id}`);

const fetchPaymentMethods = () => {
    return axios.get('http://localhost:9191/api/paymentmethods/v1/');
};

export { getOrder, createOrder, updateOrder, deleteOrder, fetchPaymentMethods };
