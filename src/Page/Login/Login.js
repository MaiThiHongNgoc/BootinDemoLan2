import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RxSlash } from "react-icons/rx"; // Assuming you're using React Router
import './Login.css';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';

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
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jwtPayload = JSON.parse(atob(base64));
            const userRole = jwtPayload.scope; // Assuming role is stored in the JWT payload

            // Redirect based on role
            if (userRole === 'ADMIN') {
                window.location.href = '/admin'; // Redirect to admin page
            } else if(userRole === "STAFF"){
                window.location.href = '/staff'; // Redirect to staff page
            } else if(userRole === "USER"){
                window.location.href = '/'; // Redirect to user home page
            }
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    return (
        <div>
            <Header/>
        <div className="login-container">
            <div className='login-page'>
                <div className='login-conten'>
                    <h1 className='login-h1'>Login</h1>
                    <div className='login-bread'>
                        <div className='login-bwp'>
                            <a className='login-a' href='#'>Home</a>
                            <span className='login-delimi'>
                                <i className='login-icon'><RxSlash /></i>
                            </span>
                            <span className='login-current'>Login</span>
                        </div>
                    </div>
                </div>
            </div>
            <form className='login-post' onSubmit={handleSubmit}>
                <div className='login-on'>
                <h1 className='login-pas'>Login</h1>
                </div>
                <div className="login-field">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="login-field">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className='login_button'>Login</button>
                {error && <p className="login-error">{error}</p>}
            </form>
            <p className="login-register-link">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
        <Footer/>
        </div>
    );
};

export default Login;
