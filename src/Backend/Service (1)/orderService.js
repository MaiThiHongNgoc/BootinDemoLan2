import axios from 'axios';

const API_URL = 'http://localhost:9191/api/order/v1/';
const PAYMENT_API_URL = 'http://localhost:9191/api/paymentmethods/v1/';

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return token;
};

const checkAdminRole = (token) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const role = payload.scope;
    if (role !== 'ADMIN' && role !== 'USER') {
        throw new Error('Unauthorized: Only admins and users can access this resource.');
    }
    
};

const getOrder = async () => {
    const token = getToken();
    checkAdminRole(token);
    try {
        const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch orders:', error.message);
        throw error;
    }
};

const getOrderById = async (orderId) => {
    const token = getToken();

    // Kiểm tra quyền admin, nếu không cần thiết thì có thể loại bỏ
    checkAdminRole(token);

    try {
        const response = await axios.get(`${API_URL}${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch orders by user ID:', error.message);
        throw error;
    }
};

const createOrder = async (order) => {
    const token = getToken();
    checkAdminRole(token);

    try {
        const response = await axios.post(API_URL, order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to create order:', error.message);
        throw error;
    }
};

const updateOrder = async (id, order) => {
    const token = getToken();
    checkAdminRole(token);

    try {
        const response = await axios.put(`${API_URL}${id}`, order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to update order:', error.message);
        throw error;
    }
};

const deleteOrder = async (order_id) => {
    const token = getToken();
    checkAdminRole(token);

    try {
        const response = await axios.delete(`${API_URL}${order_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to delete order:', error.message);
        throw error;
    }
};

const fetchPaymentMethods = async () => {
    try {
        const response = await axios.get(PAYMENT_API_URL);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch payment methods:', error.message);
        throw error;
    }
};


export { getOrder, getOrderById, createOrder, updateOrder, deleteOrder, fetchPaymentMethods };
