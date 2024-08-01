import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import './Bill.css';
import { getOrderById } from '../Backend/Service (1)/orderService';

const Bill = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const details = await getOrderById(orderId);
        console.log("Order details:", details);
        setOrderDetails(details[0]); // Assuming the response is an array with one item

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
          <p>Order ID: {orderDetails.order_id || 'N/A'}</p>
          <p>Status: {orderDetails.status || 'N/A'}</p>
          <p>Total Amount: ${orderDetails.total_amount.toFixed(2) || 'N/A'}</p>
          <p>Date: {orderDetails.order_date ? new Date(orderDetails.order_date).toLocaleString() : 'N/A'}</p>

          <h3>Billing Information</h3>
          <p>Name: {orderDetails.first_name || 'N/A'} {orderDetails.last_name || 'N/A'}</p>
          <p>Address: {orderDetails.address || 'N/A'}</p>
          <p>Phone: {orderDetails.phone_number || 'N/A'}</p>
          <p>Email: {orderDetails.email || 'N/A'}</p>

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
              {orderDetails.orderDetails.map((item) => (
                <tr key={item.order_detail_id}>
                  <td>{item.products?.product_name || 'N/A'}</td>
                  <td>${item.products?.price?.toFixed(2) || 'N/A'}</td>
                  <td>{item.quantity || 'N/A'}</td>
                  <td>${(item.products?.price * item.quantity)?.toFixed(2) || 'N/A'}</td>
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
