import axios from 'axios';

const API_URL = 'http://localhost:9191/api/orderdetail/v1/'; // Adjust the URL based on your Spring Boot API

const getOrderDetails = (page) => {
    return axios.get(`${API_URL}?p=${page}`);
};
const createOrderDetail= (orderDetail) => axios.post(API_URL, orderDetail);
const updateOrderDetail = (orderDetail) => axios.put(`${API_URL}${orderDetail.order_detail_id}`, orderDetail);
const deleteOrderDetail = (order_detail_id) => axios.delete(`${API_URL}${order_detail_id}`);

export { getOrderDetails, createOrderDetail, updateOrderDetail, deleteOrderDetail };
