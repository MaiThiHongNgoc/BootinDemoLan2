import React from 'react'
import { Link } from 'react-router-dom';
import './Join.css'
import { IoMdArrowRoundForward } from "react-icons/io";
const Join = () => {
    return (
        <div className='join-row'>
            <div className='join-container'>
                <div className='join-column-inner'>
                    <div className='join-wpb'>
                        <div className='join-p7465'>
                            <form className='join-form'> 
                                    <div className='join-wpbingo'>
                                        <div className='join-title'>
                                            <p className='join-the'>Join The Community</p>
                                        </div>
                                        <div className='join-sub-title'>
                                            <p className='join-the'>Newsletter to get in touch</p>
                                        </div>
                                        <div className='join-content'>
                                            <button className='join-the'>
                                                <span className='join-control' data-name="your-email">
                                                    <input className='join-form-control' placeholder='Your Email address...'/>
                                                </span>
                                                <br/>
                                                <span className='join-cleartfix'>
                                                    <i className='join-before'><IoMdArrowRoundForward /></i>
                                                    <input className='join-submit' type='submit' />
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join;