// src/services/ImageService.js
import axios from 'axios';

const API_URL = 'http://localhost:9191/api/imgproduct/v1/';

const getImages = () => {
  return axios.get(API_URL);
};

const getImageById = (id) => {
  return axios.get(`${API_URL}${id}`);
};

const createImage = (imageData) => {
  return axios.post(API_URL, imageData);
};

const updateImage = (id, imageData) => {
  return axios.put(`${API_URL}${id}`, imageData);
};

const deleteImage = (id) => {
  return axios.delete(`${API_URL}${id}`);
};

export default {
  getImages,
  getImageById,
  createImage,
  updateImage,
  deleteImage
};
