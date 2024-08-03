import axios from 'axios';

const API_URL = 'http://localhost:9191/feedback/';

const getFeedBack = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token not found. Please log in.');
  
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const role = payload.scope;
    try {
      if (role !== 'ADMIN' && role !== 'USER') {
        throw new Error('Unauthorized: Only admins or users can view feedback.');
      }
  
      const response = await axios.get(`${API_URL}${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('API response:', response);
      return response.data; // Return the response data
    } catch (error) {
      console.error('Failed to fetch feedback', {
        message: error.message,
        stack: error.stack,
        response: error.response?.data
      });
      throw error;
    }
  };
  

const postFeedBack = async (feedback) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token not found. Please log in.');

  const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
  const role = payload.scope;
  try {
    // Check if the user has admin or user role
    if (role !== 'ADMIN' && role !== 'USER') {
      throw new Error('Unauthorized: Only admins or users can post feedback.');
    }

    const response = await axios.post(API_URL, feedback, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Failed to post feedback', error);
    throw error;
  }
};

export default {
  getFeedBack,
  postFeedBack
};
