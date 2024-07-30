import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import './Infomation.css';
import Header from "../../Component/Header/Header";
import Footer from "../../Component/Footer/Footer";

const Infomation = () => {
    return (
        <div>
            <Header />
            <div className="infomation-content">
                <h1 className="information-h1">Your Profile</h1>
            </div>
            <div className="infomation-container">
                <div>
                    <NavLink
                        to='/infomation/myinfo'
                        className={({ isActive }) => "infomation-link" + (isActive ? " active" : "")}
                    >
                        My Information
                    </NavLink>
                    <NavLink
                        to='/infomation/userorder'
                        className={({ isActive }) => "infomation-link" + (isActive ? " active" : "")}
                    >
                        User Orders
                    </NavLink>
                </div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Infomation;
