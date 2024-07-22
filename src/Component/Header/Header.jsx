
import React, { useState, useContext } from 'react';  
import { Link } from 'react-router-dom';  
import { RxAvatar } from 'react-icons/rx';  
import { FiShoppingCart } from 'react-icons/fi';    
import './Header.css';  
import { AuthContext } from '../../AuthContext';  
import Cart from '../../Cart/Cart';


const Header = () => {  
    const [activeLink, setActiveLink] = useState(null);  
    const { isLoggedIn, cart_id } = useContext(AuthContext);  
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
                    {/* Optional category links or content */}  
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
                <div className="user-info">  
                    {isLoggedIn ? (  
                        <>  
                            <RxAvatar className="login-icon" onClick={() => {/* handle user info click here if needed */}} />  
                            <FiShoppingCart className="cart-icon" onClick={toggleCart} />  
                        </>  
                    ) : (  
                        <Link to="/login">  
                            <RxAvatar className="login-icon" />  
                        </Link>  
                    )}  
                </div>  
            </div>  

            {showCart && isLoggedIn && cart_id && (  
                <div className="cart-sidebar">  
                   {/* <Link to="/cart">
                   <FiShoppingCart className="cart-icon"/>
                   </Link> */}
                   <Cart/>
                </div>  
            )}  
        </div>  
    );  
};  

export default Header;
