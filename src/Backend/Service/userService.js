import axios from 'axios';

const API_URL = 'http://localhost:9191/api/user/v1/'; // Adjust the URL based on your Spring Boot API

const getUsers = () => axios.get(API_URL);
const createUser = (users) => axios.post(API_URL, users);
const updateUser = (users) => axios.put(`${API_URL}${users.user_id}`, users);
const deleteUser = (user_id) => axios.delete(`${API_URL}${user_id}`);

export { getUsers, createUser, updateUser, deleteUser };
