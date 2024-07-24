import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { RxSlash } from 'react-icons/rx';
import Header from '../../Component/Header/Header';
import './register.css';
import Footer from '../../Component/Footer/Footer';

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
            localStorage.setItem('user_id', user_id);
            
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
    <div>
        <Header/>
        <div className="container">
            <div className='register-page'>
                <div className='register-content'>
                    <h1 className='register-header'>Register</h1>
                    <div className='register-breadcrumb'>
                        <div className='register-path'>
                            <a className='register-link' href='#'>Login</a>
                            <span className='register-delimiter'>
                                <i className='register-icon'><RxSlash /></i>
                            </span>
                            <span className='register-current'>Register</span>
                        </div>
                    </div>
                </div>
            </div>
            <form className='register-form' onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
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
                    <label htmlFor="password">Password:</label>
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
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                    <button className='register-button' type="submit">Register</button>
                {error && <p className="error">{error}</p>}
            </form>
            <p className='register-to'>
                Login to your account? <Link to="/login">Login here</Link>
            </p>
        </div>
        <Footer/>
    </div>    
    );
};

export default RegisterForm;
