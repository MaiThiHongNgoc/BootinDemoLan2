import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { RxAvatar } from 'react-icons/rx';
import { FiShoppingCart } from 'react-icons/fi';
import Search from '../../Search/Search'
import './Header.css';
import { AuthContext } from '../../AuthContext';
import Cart from '../../Cart/Cart';
import Logout from '../../Page/LogOut/LogOut';

const Header = () => {
    const [activeLink, setActiveLink] = useState(null);
    const { isLoggedIn, cart_id } = useContext(AuthContext);
    const [showCart, setShowCart] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);


    const userId = localStorage.getItem('user_id'); // or wherever you get the user ID from

    const handleCartClose = () => {
        setShowCart(false);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const toggleCart = () => {
        setShowCart(!showCart);
    };
    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
      };

    return (
        <div className="Header">
            <div className="navbar-header-container1">
                <div className='navbar-header-category'>
                    <Search />
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
            <FiShoppingCart className="cart-icon" onClick={toggleCart} aria-label="Shopping Cart" /> 
                <div className="user-info">
                    <div className="user-icon-container" onClick={toggleDropdown}>
                        <RxAvatar className="login-icon" aria-label="User Info" />
                    </div>

                    {isDropdownVisible && (
                        <div className="dropdown-menu">
                            <Link to="/login" className="dropdown-item">Login</Link>
                            <Logout />
                        </div>
                    )}
                </div>
            </div>

            {showCart && (
                <div className="cart-sidebar">
                    <Cart userId={userId} onClose={handleCartClose} />
                </div>
            )}
        </div>
    );
};

export default Header;
