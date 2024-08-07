import axios from 'axios';

const API_URL = 'http://localhost:9191/api/author/v1/';

const token = localStorage.getItem('token');
// Lấy danh sách tác giả
export const getAuthors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; 
  } catch (error) {
    console.error('Failed to fetch authors', error);
    throw error;
  }
};
// Lấy chi tiết tác giả theo ID
export const getAuthorById = async (authorId) => {
  try {
    const response = await axios.get(`${API_URL}${authorId}`,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch author ${authorId}`, error);
    throw error;
  }
};

// Thêm mới một tác giả
export const addAuthor = async (author) => {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const role = payload.scope;

  try {
    if (role !== 'ADMIN') {
      throw new Error('Unauthorized: Only admins can add authors.');
    }
    const response = await axios.post(API_URL, author, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Failed to add author', error);
    throw error;
  }
};

// Cập nhật thông tin tác giả theo ID
export const updateAuthor = async (id, author) => {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const role = payload.scope;

  try {
    if (role !== 'ADMIN') {
      throw new Error(`Unauthorized: Only admins can update author ${id}.`);
    }
    const response = await axios.put(`${API_URL}${id}`, author, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update author ${id}`, error);
    throw error;
  }
};

// Xóa tác giả theo ID
export const deleteAuthor = async (authorId) => {
  const token = localStorage.getItem('token');
  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const role = payload.scope;

  try {
    if (role !== 'ADMIN') {
      throw new Error(`Unauthorized: Only admins can delete author ${authorId}.`);
    }
    const response = await axios.delete(`${API_URL}${authorId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete author ${authorId}`, error);
    throw error;
  }
};
