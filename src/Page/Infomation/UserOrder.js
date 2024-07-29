import axios from "axios";
import React, { useState, useEffect } from "react";
import './UserOrder.css';

const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            const response = await axios.get(`http://localhost:9191/api/order/v1/userOrder/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    if (orders.length === 0) return <p>No orders found</p>;

    return (
        <div className="order-container">
            <h1 className="order-title">Order Details</h1>
            {orders.map(order => (
                <div key={order.order_id} className="order-info">
                    <p><strong>Order ID:</strong> {order.order_id}</p>
                    <p><strong>User:</strong> {order.user.username} ({order.user.email})</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>
                    <p><strong>Status:</strong> {order.status}</p>

                    <div className="order-details">
                        <h2>Order Details</h2>
                        {order.orderDetails.map(detail => (
                            <div key={detail.order_detail_id} className="product-container">
                                <h3>{detail.products.product_name}</h3>
                                <p><strong>Author:</strong> {detail.products.author.author_name}</p>
                                <p><strong>Price:</strong> ${detail.products.price.toFixed(2)}</p>
                                <p><strong>Quantity:</strong> {detail.quantity}</p>
                                <div className="product-images">
                                    {detail.products.imgProducts && detail.products.imgProducts.length > 0 && (
                                        <img
                                            key={detail.products.imgProducts[0].img_id}
                                            src={detail.products.imgProducts[0].img_url}
                                            alt={detail.products.imgProducts[0].img_name}
                                        />
                                    )}
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserOrder;
