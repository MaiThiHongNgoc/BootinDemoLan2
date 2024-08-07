import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './UserOrder.css';

const UserOrder = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Initialize navigate

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('user_id');

            if (!token || !userId) {
                throw new Error("User is not authenticated");
            }

            const response = await axios.get(`http://localhost:9191/api/order/v1/userOrder/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const sortedOrders = response.data.sort((a, b) => b.order_id - a.order_id);
            setOrders(sortedOrders);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFeedbackClick = (productId) => {
        navigate('/feedback', { state: { productId } }); // Navigate correctly with productId
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (orders.length === 0) return <p>No orders found</p>;

    const groupedOrders = orders.reduce((acc, order) => {
        (acc[order.status] = acc[order.status] || []).push(order);
        return acc;
    }, {});

    return (
        <div className="order-container">
            <div className="order-status-wrapper">
                {Object.keys(groupedOrders).map(status => (
                    <div key={status} className="order-status-section">
                        <h2 className="status-title">{status}</h2>
                        {groupedOrders[status].map(order => (
                            <div key={order.order_id} className="order-info">
                                <p><strong>Order ID:</strong> {order.order_id}</p>
                                <p><strong>User:</strong> {order.user.username} ({order.user.email})</p>
                                <p><strong>Address:</strong> {order.address}</p>
                                <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
                                <p><strong>Order Date:</strong> {new Date(order.order_date).toLocaleString()}</p>

                                <div className="order-details">
                                    <h3>Products</h3>
                                    {order.orderDetails.map(detail => (
                                        <div key={detail.order_detail_id} className="product-content">
                                            <div className="product-images">
                                                {detail.products.imgProducts && detail.products.imgProducts.length > 0 && (
                                                    <img
                                                        key={detail.products.imgProducts[0].img_id}
                                                        src={detail.products.imgProducts[0].img_url}
                                                        alt={detail.products.imgProducts[0].img_name}
                                                    />
                                                )}
                                            </div>
                                            <div className="product-info">
                                                <h4>{detail.products.product_name}</h4>
                                                <p><strong>Author:</strong> {detail.products.author.author_name}</p>
                                                <p><strong>Price:</strong> ${detail.products.price.toFixed(2)}</p>
                                                <p><strong>Quantity:</strong> {detail.quantity}</p>
                                                {order.status.toLowerCase() === 'completed' && (
                                                     <button onClick={() => handleFeedbackClick(detail.products.product_id)} className="add-to-cart-button">
                                                     Feedback
                                                   </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserOrder;
