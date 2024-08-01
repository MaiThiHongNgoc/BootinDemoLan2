import React, { useState, useEffect } from 'react';
import { getOrderDetailById } from '../Backend/Service (1)/orderDetailService'; // Import your order detail service
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import './Bill.css';

const Bill = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await getOrderDetailById(orderId); // Fetch order details by order ID
        setOrderDetails(data);
        console.log('Fetched order details:', data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="bill-page">
        <h1>Order Confirmation</h1>
        <div className="order-summary">
          <h2>Order Details</h2>
          <p>Order ID: {orderDetails.order_id}</p>
          <p>Status: {orderDetails.status}</p>
          <p>Total Amount: ${orderDetails.total_amount}</p>
          <p>Date: {new Date(orderDetails.date).toLocaleString()}</p>

          <h3>Billing Information</h3>
          <p>Name: {orderDetails.user.first_name} {orderDetails.user.last_name}</p>
          <p>Address: {orderDetails.user.address}</p>
          <p>Phone: {orderDetails.user.phone_number}</p>
          <p>Email: {orderDetails.user.email}</p>

          <h3>Products</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.products.map((product, index) => (
                <tr key={index}>
                  <td>{product.product_name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.quantity}</td>
                  <td>${(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Bill;
