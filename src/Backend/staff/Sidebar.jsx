import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <BsCart3 className='icon_header' /> SHOP
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <Link to="/products" className="sidebar-link">
            <BsFillArchiveFill className='icon' /> Products
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/user" className="sidebar-link">
            <BsListCheck className='icon' /> Customer
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/order" className="sidebar-link">
            <BsListCheck className='icon' /> Order
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar;
