import { useState } from 'react'
import './Staff.css'
import Header from './Header'
import Sidebar from './Sidebar'
import OrderDetailList from '../orderDetail/orderDetailList'

function Staff() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <OrderDetailList/>
    </div>
  )
}

export default Staff;