import axios from 'axios';

const API_URL = 'http://localhost:9191/api/products/v1/';

// Lấy danh sách sản phẩm theo trang
export const getProducts =  async (page = 0) => {
    return  axios.get(`${API_URL}?p=${page}`);
};
export const getAllProducts = () => {
    return axios.get(`${API_URL}`);
};

// Lấy chi tiết sản phẩm theo ID
export const getProductById = (id) => {
    return axios.get(`${API_URL}${id}`);
};

// Tạo mới một sản phẩm
export const createProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error('Failed to create product:', error.response.data);
        throw error;
    }
};

// Cập nhật thông tin sản phẩm theo ID
export const updateProduct = (id, product) => {
    return axios.put(`${API_URL}${id}`, product);
};

// Xóa sản phẩm theo ID
export const deleteProduct = (id) => {
    return axios.delete(`${API_URL}${id}`);
};

// Lấy danh sách danh mục sản phẩm
export const getCategories = () => {
    return axios.get('http://localhost:9191/api/categories/v1/');
};
