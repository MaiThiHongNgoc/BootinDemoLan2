import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getOrderById } from '../Service (1)/orderService';
import './orderDetail.css'; 

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            try {
                const response = await getOrderById(orderId);
                setOrder(response[0]); // Adjusted to handle array response
            } catch (error) {
                setError('Failed to fetch order details. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    const handleBack = () => {
        navigate('/admin/order'); // Redirect back to the order list page
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    // Check if order exists before rendering
    return (
        <div className="order-detail-page">
            {order ? (
                <div className="order-details">
                    <h1>Order ID: {order.order_id}</h1>
                    <p><strong>User Name:</strong> {order.user?.username}</p>
                    <p><strong>First Name:</strong> {order.first_name}</p>
                    <p><strong>Last Name:</strong> {order.last_name}</p>
                    <p><strong>Email:</strong> {order.user?.email}</p>
                    <p><strong>Phone:</strong> {order.user?.phone}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>Order Date:</strong> {new Date(order.order_date).toUTCString()}</p>
                    <p><strong>Total Amount:</strong> ${order.total_amount.toFixed(2)}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethods?.method_name}</p>

                    <h3>Order Details</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Description</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderDetails?.map((detail) => (
                                <tr key={detail.order_detail_id}>
                                    <td>{detail.products?.product_name}</td>
                                    <td>${detail.products?.price.toFixed(2)}</td>
                                    <td>{detail.quantity}</td>
                                    <td>${(detail.products?.price * detail.quantity).toFixed(2)}</td>
                                    <td>{detail.products?.description}</td>
                                    <td>
                                        {detail.products?.imgProducts?.length > 0 && (
                                            <img
                                                src={detail.products.imgProducts[0].img_url}
                                                alt={detail.products.imgProducts[0].img_name}
                                                className="product-image"
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleBack} className="back-button">Back to Orders</button>
                </div>
            ) : (
                <p>No order details available.</p>
            )}
        </div>
    );
};

export default OrderDetails;
