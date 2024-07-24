import React, { useState, useEffect } from 'react';
import { getOrder, updateOrder, deleteOrder, createOrder } from '../Service (1)/orderService';
import './orderList.css';
import OrderForm from './orderForm';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrder();
            setOrders(response);
        } catch (error) {
            setError('Failed to fetch orders. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setShowForm(true);
    };

    const handleDelete = async (order_id) => {
        setLoading(true);
        try {
            await deleteOrder(order_id);
            await loadOrders();
        } catch (error) {
            setError('Failed to delete order. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrder = () => {
        setEditingOrder(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingOrder(null);
        setError(null);
    };

    const refreshOrders = () => {
        loadOrders(); // Reload orders after saving
    };

    const handleStatusChange = async (e, order) => {
        const updatedStatus = e.target.value;
        const updatedOrder = { ...order, status: updatedStatus };

        const payload = {
            user: { user_id: updatedOrder.user.user_id },
            address: updatedOrder.address,
            paymentMethods: { payment_method_id: updatedOrder.paymentMethods.payment_method_id },
            total_amount: updatedOrder.total_amount,
            status: updatedStatus
        };

        setLoading(true);
        try {
            await updateOrder(updatedOrder.order_id, payload);
            await loadOrders();
        } catch (error) {
            setError(`Failed to update status: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleToggleDetails = (order_id) => {
        setExpandedOrderId(expandedOrderId === order_id ? null : order_id);
    };

    const filteredOrders = orders.filter(order =>
        order.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Order Management</h1>
            {showForm && (
                <OrderForm
                    order={editingOrder}
                    onSave={handleFormClose}
                    refreshOrders={refreshOrders} // Pass refreshOrders function
                />
            )}
            <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="order-search"
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="order-list-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <React.Fragment key={order.order_id}>
                                <tr>
                                    <td>
                                        <button className="toggle-button" onClick={() => handleToggleDetails(order.order_id)}>
                                            {expandedOrderId === order.order_id ? '-' : '+'}
                                        </button>
                                    </td>
                                    <td>{order.order_id}</td>
                                    <td>{order.user.username}</td>
                                    <td>{order.user.email}</td>
                                    <td>{order.user.phone}</td>
                                    <td>{order.address}</td>
                                    <td>{new Date(order.order_date).toUTCString()}</td>
                                    <td>{order.total_amount.toFixed(2)}</td>
                                    <td>
                                        <select
                                            name="status"
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(e, order)}
                                        >
                                            <option value="PENDING">Pending</option>
                                            <option value="COMPLETED">Completed</option>
                                            <option value="PROCESSING">Processing</option>
                                            <option value="CANCELLED">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>{order.paymentMethods.method_name}</td>
                                    <td>
                                        <button className="order-list-button-edit" onClick={() => handleEdit(order)}>Edit</button>
                                        <button className="order-list-button-delete" onClick={() => handleDelete(order.order_id)}>Delete</button>
                                    </td>
                                </tr>

                                {expandedOrderId === order.order_id && (
                                    <tr>
                                        <td colSpan="11" className="order-details">
                                            <h3>Order Details</h3>
                                            {order.orderDetails.map((detail) => (
                                                <div key={detail.order_detail_id}>
                                                    <p>Product Name: {detail.products.product_name}</p>
                                                    <p>Quantity: {detail.quantity}</p>
                                                    <p>Total Price: ${detail.total_price}</p>
                                                    <p>Description: {detail.products.description}</p>
                                                    {detail.products.imgProducts.length > 0 && (
                                                        <img
                                                            src={detail.products.imgProducts[0].img_url}
                                                            alt={detail.products.imgProducts[0].img_name}
                                                            className="product-image"
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </td>

                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderList;
