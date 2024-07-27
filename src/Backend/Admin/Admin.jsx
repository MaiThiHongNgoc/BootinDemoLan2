import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Admin.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';

function Admin() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [userRole, setUserRole] = useState(null);

  const toggleSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.scope); // assuming 'scope' contains the role
    } else {
      setUserRole(''); // or redirect to login if token is not found
    }
  }, []);

  if (userRole === null) {
    return <div>Loading...</div>; // Show a loading state while checking the role
  }

  if (userRole !== 'ADMIN') {
    return <Navigate to="/404" />; // Redirect to 404 or any other page if the user is not an admin
  }

  return (
    <div className='grid-container'>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
