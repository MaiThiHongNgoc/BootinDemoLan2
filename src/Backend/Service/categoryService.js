import axios from 'axios';

const API_URL = 'http://localhost:9191/api/categories/v1/';

const getCategories = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch categories', error);
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch category with id ${id}`, error);
    throw error;
  }
};

const createCategory = async (category) => {
  try {
    const response = await axios.post(API_URL, category);
    return response.data;
  } catch (error) {
    console.error('Failed to create category', error);
    throw error;
  }
};

const updateCategory = async (id, category) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, category);
    return response.data;
  } catch (error) {
    console.error(`Failed to update category with id ${id}`, error);
    throw error;
  }
};

const deleteCategory = async (id) => {
  try {
    await axios.delete(`${API_URL}${id}`);
  } catch (error) {
    console.error(`Failed to delete category with id ${id}`, error);
    throw error;
  }
};

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };