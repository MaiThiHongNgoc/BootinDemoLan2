import React, { useState } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Logout from '../../Page/LogOut/LogOut';
import './Header.css';

function Header({ OpenSidebar }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <header className='header3'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar} />
      </div>
      <div className='header-left'>
        <BsSearch className='icon' />
      </div>
      <div className='header-right'>
        <BsFillBellFill className='icon' />
        <BsFillEnvelopeFill className='icon' />
        <div className="admin-container" onClick={toggleDropdown}>
          <BsPersonCircle className='icon' />
        </div>

        {isDropdownVisible && (
          <div className="menu">
            <Link to="/login" className="item">Login</Link>
            <Logout />
            <Link to="/infomation" className='infomation'>infomation</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
