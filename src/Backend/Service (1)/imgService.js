// src/services/ImageService.js
import axios from 'axios';

const API_URL = 'http://localhost:9191/api/imgproduct/v1/';

const getImages = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');

  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const role = payload.scope;
  try {
    // Check if the user has admin role
    if (role !== 'ADMIN') {
      throw new Error('Unauthorized: Only admins can view images.');
    }

    const response = await axios.get(API_URL, {
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

const getImageById = (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');
  
  return axios.get(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const createImage = (imageData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');
  
  return axios.post(API_URL, imageData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const updateImage = (id, imageData) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');
  
  return axios.put(`${API_URL}${id}`, imageData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

const deleteImage = (id) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');
  
  return axios.delete(`${API_URL}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export default {
  getImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage
};
