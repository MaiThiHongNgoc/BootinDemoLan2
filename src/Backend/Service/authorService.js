import axios from 'axios';

const API_URL = 'http://localhost:9191/api/author/v1/';

export const getAuthors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch authors', error);
    throw error; // Re-throw the error for the calling function to handle
  }
};

export const addAuthor = async (author) => {
  try {
    const response = await axios.post(API_URL, author);
    return response.data;
  } catch (error) {
    console.error('Failed to add author', error);
    throw error;
  }
};

export const updateAuthor = async (id,author) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, author);
    return response.data;
  } catch (error) {
    console.error('Failed to update author', error);
    throw error;
  }
};

export const deleteAuthor = async (authorId) => {
  try {
    const response = await axios.delete(`${API_URL}${authorId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete author', error);
    throw error;
  }
};
