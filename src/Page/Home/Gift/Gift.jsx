import React from 'react'
import { Link } from 'react-router-dom';
import './Gift.css'
const Gift = () => {
    return (
        <div className='gift-fill'>
            <div className='gift-container'>
                <div className='gift-inner'>
                <div className='gift-wrapper'>
                    <div className='gift-text'>
                        <div className='gift-per'>
                            <h2 className='gift-h2'>Wonderful Gift</h2>
                            <p className='gift-p'>
                            Give your Family and friend a Books
                            <br/>
                            <a className='gift-a' href='http://localhost:3000/shop'>Shop Now</a>
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
};    
export default Gift;