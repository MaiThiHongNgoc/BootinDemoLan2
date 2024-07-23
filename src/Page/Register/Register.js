import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phone: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Register the user
            const response = await axios.post('http://localhost:9191/auth/register', formData);
            console.log('Registration Success:', response.data);

            // Login to get the token
            const loginResponse = await axios.post('http://localhost:9191/auth/login/', {
                username: formData.username,
                password: formData.password
            });

            const token = loginResponse.data.token;
            localStorage.setItem('token', token);

            const user_id = response.data.user_id;
            localStorage.setItem('userId', user_id);
            
            // Prepare cart data
            const cartData = {
                user: {
                    user_id: user_id
                }
            };

            // Create a cart for the user
            const responseCart = await axios.post('http://localhost:9191/api/cart/v1/', cartData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Cart Creation Success:', responseCart.data);

            // Redirect to home page after successful registration
            navigate('/');

        } catch (error) {
            console.error('Error:', error);
            if (error.response && error.response.data) {
                setError(error.response.data); // Set the error message from the response
            } else {
                setError('Registration failed. Please try again.');
            }
        }
    };

    return (
        <div className="container">
            <h2>Đăng Ký</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Tên đăng nhập:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số điện thoại:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <button type="submit">Đăng Ký</button>
                </div>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default RegisterForm;
