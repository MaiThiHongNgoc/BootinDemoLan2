import React, { useState, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DashBoard.css';
import { getProducts } from '../Service (1)/productService';
import { getUsers } from '../Service (1)/userService'; // Import your user service
import { getOrder } from '../Service (1)/orderService';
import { NavLink } from 'react-router-dom';

// Function to format date to YYYY-MM-DD
const formatDateToDay = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // YYYY-MM-DD format
};

// Function to group data by day
const groupByDay = (data) => {
  const result = {};

  data.forEach(item => {
    const day = formatDateToDay(item.order_date);
    if (!result[day]) {
      result[day] = { totalAmount: 0, totalOrders: 0 }; // Or other metrics you need
    }
    result[day].totalAmount += item.total_amount;
    result[day].totalOrders += 1;
  });

  return Object.keys(result).map(day => ({
    name: day,
    totalAmount: result[day].totalAmount,
    totalOrders: result[day].totalOrders
  }));
};

function DashBoard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products, users, and orders
        const productResponse = await getProducts();
        const productsData = productResponse;

        const userResponse = await getUsers();
        const usersData = userResponse;

        const orderResponse = await getOrder();
        const orderData = orderResponse;

        const orderDataFormatted = groupByDay(orderData); // Group data by day

        setProducts(productsData);
        setUsers(usersData);
        setOrders(orderData);
        setChartData(orderDataFormatted);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <NavLink to="/admin/products" className={'number-product'}>
          <h1 className='number-product'>{products.totalElements}</h1>
          </NavLink>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>PENDING</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <NavLink to="/admin/orders/PENDING" className={'number-product'}>
          <h1 className='number-product'>{orders.filter(order => order.status === "PENDING").length}</h1>
          </NavLink>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>COMPLETED</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <NavLink to="/admin/orders/COMPLETED" className={'number-product'}>
          <h1 className='number-product'>{orders.filter(order => order.status === "COMPLETED").length}</h1>
          </NavLink>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>ORDER</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <NavLink to="/admin/order" className={'number-product'}>
          <h1 className='number-product'>{orders.length}</h1>
          </NavLink>
          </div>
      </div>

      <div className='charts'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalAmount" fill="#8884d8" />
            <Bar dataKey="totalOrders" fill="#82ca9d" /> {/* Optional: thêm Bar cho số lượng đơn hàng */}
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="totalOrders" stroke="#82ca9d" /> {/* Optional: thêm Line cho số lượng đơn hàng */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}

export default DashBoard;
