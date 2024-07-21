// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { FaShoppingCart } from 'react-icons/fa';
import Cart from '../../Cart/Cart'; 
import Search from '../../Search/Search'; // Ensure the correct import path
import './Header.css';
//import CartSidebar from '../../Cart/CartSidebar';

const Header = ({ user_id }) => {
    const [activeLink, setActiveLink] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(true);  // Assume user is logged in for this example
    const [showCart, setShowCart] = useState(false);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };

    return (
        <div className="Header">
            <div className="navbar-header-container1">
                <div className='navbar-header-category'>
                    {/* Add category links or content here */}
                    <Search/>
                </div>
            </div>

            <div className="navbar-header-container2">
                <div className="logo-header">
                    <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/07/logo.png" alt="Logo" />
                </div>

                <div className="navbar-header-link">
                    <div className={`navbar-header-home ${activeLink === "home" ? "active" : ""}`} onClick={() => handleLinkClick("home")}>
                        <Link to="/">HOME</Link>
                    </div>
                    <div className={`navbar-header-shop ${activeLink === "shop" ? "active" : ""}`} onClick={() => handleLinkClick("shop")}>
                        <Link to="/shop">SHOP</Link>
                    </div>
                    <div className={`navbar-header-blog ${activeLink === "blog" ? "active" : ""}`} onClick={() => handleLinkClick("blog")}>
                        <Link to="/blog">BLOG</Link>
                    </div>
                    <div className={`navbar-header-author ${activeLink === "author" ? "active" : ""}`} onClick={() => handleLinkClick("author")}>
                        <Link to="/author">AUTHOR</Link>
                    </div>
                    <div className={`navbar-header-contact ${activeLink === "contact" ? "active" : ""}`} onClick={() => handleLinkClick("contact")}>
                        <Link to="/contact">CONTACT</Link>
                    </div>
                </div>
            </div>

            <div className="navbar-header-container3">
                {isLoggedIn ? (
                    <div className="user-info">
                        <RxAvatar className="login-icon" />
                        <FaShoppingCart className="cart-icon" onClick={toggleCart} />
                    </div>
                ) : (
                    <Link to="/login">
                        <RxAvatar className="login-icon" />
                    </Link>
                )}
            </div>

            {showCart && <div className="cart-sidebar"><Cart user_id={user_id} /></div>}
        </div>
    );
};

export default Header;
