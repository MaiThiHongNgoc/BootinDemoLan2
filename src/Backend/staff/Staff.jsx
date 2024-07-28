import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode correctly
import Header from './Header';
import Sidebar from './Sidebar';
import OrderDetailList from '../orderDetail/orderDetailList';

function Staff() {
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

  if (userRole !== 'STAFF') {
    return <Navigate to="/404" />; // Redirect to 404 or any other page if the user is not a staff member
  }

  return (
    <div className='grid-container'>
      <Header toggleSidebar={toggleSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} toggleSidebar={toggleSidebar} />
      <OrderDetailList />
    </div>
  );
}

export default Staff;
