import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';
import Footer from '../../Component/Footer/Footer';
import { RxSlash } from 'react-icons/rx';
import { jwtDecode } from 'jwt-decode';
import Header from "./../../Component/Header/Header";  


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:9191/auth/login/', { username, password });
            const token = response.data.token;
            localStorage.setItem('token', token);

            // Decode the token to get user role information
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.scope; // Assuming role is stored in the 'scope' field

            // Fetch user information
            const userResponse = await axios.get('http://localhost:9191/api/user/v1/myinfo', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const user = userResponse.data;

            localStorage.setItem('user_id', user.user_id);
            
            //localStorage.setItem('userId', user.user_id);

            // Redirect based on role
            if (userRole === 'ADMIN') {
                window.location.href = '/admin'; // Redirect to admin page
            } else if (userRole === 'STAFF') {
                window.location.href = '/staff'; // Redirect to staff page
            } else if (userRole === 'USER') {
                window.location.href = '/'; // Redirect to user home page
            }
        } catch (error) {
            console.error('Login failed:', error); // Improved error logging
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div>
            <Header />
            <div className="login-container">
                <div className='login-page'>
                    <div className='login-content'>
                        <h1 className='login-header'>Login</h1>
                        <div className='login-breadcrumb'>
                            <div className='login-breadcrumb-path'>
                                <a className='login-link' href='#'>Home</a>
                                <span className='login-delimiter'>
                                    <i className='login-icon'><RxSlash /></i>
                                </span>
                                <span className='login-current'>Login</span>
                            </div>
                        </div>
                    </div>
                </div>
                <form className='login-form' onSubmit={handleSubmit}>
                <h1 className='login-h1'>Login</h1>
                    <div className="login-field">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className='login-button'>Login</button>
                    {error && <p className="login-error">{error}</p>}
                </form>
                <p className="login-register-link">
                    Don't have an account? <Link to="/register">Register here</Link>
                </p>
                <Footer />
            </div>
        </div>
    );
};

export default Login;
