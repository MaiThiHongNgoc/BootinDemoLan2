import axios from 'axios';

const API_URL = 'http://localhost:9191/api/orderdetail/v1/'; // Adjust the URL based on your Spring Boot API

const getOrderDetails = async (page) => {
    const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');

  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const role = payload.scope;
  try {
    // Check if the user has admin role
    if (role !== 'ADMIN') {
      throw new Error('Unauthorized: Only admins can view images.');
    }

    const response = await axios.get(`${API_URL}?p=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch images', error);
    throw error;
  }
};
const createOrderDetail= (orderDetail) => axios.post(API_URL, orderDetail);
const updateOrderDetail = (orderDetail) => axios.put(`${API_URL}${orderDetail.order_detail_id}`, orderDetail);
const deleteOrderDetail = (order_detail_id) => axios.delete(`${API_URL}${order_detail_id}`);

export { getOrderDetails, createOrderDetail, updateOrderDetail, deleteOrderDetail };
