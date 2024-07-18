import React from 'react';
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsListCheck } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { RxAvatar } from "react-icons/rx";
import { IoMdImages } from "react-icons/io";

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
          <Link to="/" className="sidebar-link">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/image" className="sidebar-link">
            <IoMdImages className='icon' /> Image Products
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/products" className="sidebar-link">
            <BsFillArchiveFill className='icon' /> Products
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/category" className="sidebar-link">
            <BsFillGrid3X3GapFill className='icon' /> Categories
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/authors" className="sidebar-link">
            <RxAvatar className='icon' /> Authors
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/user" className="sidebar-link">
            <BsPeopleFill className='icon' /> Customers
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/order" className="sidebar-link">
            <BsListCheck className='icon' /> Order
          </Link>
        </li>
        <li className='sidebar-list-item'>
          <Link to="/orderdetail" className="sidebar-link"> 
            <BsListCheck className='icon' /> Order Detail
          </Link>
        </li>
      </ul>
    </aside>
  )
}

export default Sidebar;
