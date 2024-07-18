import axios from 'axios';

const API_URL = 'http://localhost:9191/api/order/v1/';

const getOrder = () => axios.get(API_URL);

const createOrder = (order) => axios.post(API_URL, order);

const updateOrder = (id, order) => axios.put(`${API_URL}${id}`, order);

const deleteOrder = (order_id) => axios.delete(`${API_URL}${order_id}`);

const fetchPaymentMethods = () => {
    return axios.get('http://localhost:9191/api/paymentmethods/v1/');
};

export { getOrder, createOrder, updateOrder, deleteOrder, fetchPaymentMethods };
