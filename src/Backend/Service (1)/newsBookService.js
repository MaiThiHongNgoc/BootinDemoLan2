import axios from 'axios';

// URL API
const API_URL = 'http://localhost:9191/api/news-books/';

// Lấy token từ local storage
const getToken = () => localStorage.getItem('token');

// Cập nhật sách
export const updateBook = async (bookId, bookData) => {
    try {
        const token = getToken(); // Lấy token

        await axios.put(`${API_URL}${bookId}`, bookData, {
            headers: {
                'Authorization': `Bearer ${token}` // Thêm token vào headers
            }
        });
    } catch (error) {
        console.error('Failed to update book', error);
        throw new Error('Failed to update book');
    }
};

// Xóa sách
export const deleteBook = async (bookId) => {
    try {
        const token = getToken(); // Lấy token từ authService

        await axios.delete(`${API_URL}${bookId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Thêm token vào headers
            }
        });

        console.log('Book deleted successfully');
    } catch (error) {
        console.error('Failed to delete book', error);
        throw new Error('Failed to delete book');
    }
};

export const add = async () => {
    try {
        const token = getToken(); // Lấy token từ authService

        // Kiểm tra xem token có tồn tại không
        if (!token) {
            throw new Error('Token is missing');
        }

        const response = await axios.post(API_URL, {}, { // Gửi yêu cầu POST
            headers: {
                'Authorization': `Bearer ${token}`, // Thêm token vào headers
                'Content-Type': 'application/json' // Đặt type content cho dữ liệu JSON
            }
        });

        return response.data; // Trả về dữ liệu phản hồi nếu cần
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized access. Please check your token or role.');
            throw new Error('Unauthorized access. Please check your token or role.');
        } else {
            console.error('Failed to add book', error);
            throw new Error('Failed to add book');
        }
    }
};