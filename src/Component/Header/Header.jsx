import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import { RxAvatar } from "react-icons/rx";
import Search from "../../Search/Search"
const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLinkClick = (link) => {
      setActiveLink(link);
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
                  <div className="user-info">Welcome, User</div>
              ) : (
                  <Link to="/login">
                      <RxAvatar className="login-icon" />
                  </Link>
              )}
          </div>
      </div>
  );
};

export default Header;