import React from "react";
import { Link } from "react-router-dom";
import './Infomation.css'; // Import CSS nếu cần

const Infomation = () => {
    return (
        <div className="infomation-container">
            <h2>Information</h2>
            <nav>
                <Link to='/myinfo' className="infomation-link">My Information</Link>
                <Link to='/userorder' className="infomation-link">User Orders</Link>
            </nav>
        </div>
    );
};

export default Infomation;
