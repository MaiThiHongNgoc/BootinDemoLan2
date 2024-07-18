import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

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
                window.location.href = '/staff'; // Redirect to default page
            }else if(userRole === "USER"){
                window.location.href = '/'
            }
        } catch (error) {
            setError('Invalid login credentials');
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default Login;
