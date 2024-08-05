import React, { useState } from 'react';
import { IoMdArrowRoundForward } from "react-icons/io";
import './Join.css';

const Join = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        console.log('Email submitted:', email);
        localStorage.setItem('newsletterEmail', email);
        alert('Email successfully submitted!');
        setEmail('');
    };

    return (
        <div className='join-row'>
            <div className='join-container'>
                <div className='join-column-inner'>
                    <div className='join-wpb'>
                        <div className='join-p7465'>
                            <form className='join-form' onSubmit={handleSubmit}> 
                                <div className='join-wpbingo'>
                                    <div className='join-title'>
                                        <p className='join-the'>Join The Community</p>
                                    </div>
                                    <div className='join-sub-title'>
                                        <p className='join-the'>Newsletter to get in touch</p>
                                    </div>
                                    <div className='join-content'>
                                        <div className='join-the'>
                                            <span className='join-control' data-name="your-email">
                                                <input
                                                    className='join-form-control'
                                                    placeholder='Your Email address...'
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </span>
                                            <br/>
                                            <span className='join-cleartfix'>
                                                <i className='join-before' onClick={handleSubmit}><IoMdArrowRoundForward /></i>
                                            </span>
                                        </div>
                                    </div>
                                    {error && <p className='error-message'>{error}</p>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Join;
