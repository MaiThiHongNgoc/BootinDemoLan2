import React, { useState, useEffect } from 'react';
import { getOrder, updateOrder, deleteOrder } from '../Service (1)/orderService';
import './orderList.css';
import OrderForm from './orderForm';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        setLoading(true);
        try {
            const response = await getOrder();
            setOrders(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch orders', error);
            setError('Failed to fetch orders. Please try again later.');
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
            await loadOrders(); // Reload orders after successful deletion
        } catch (error) {
            console.error('Failed to delete order', error);
            setError('Failed to delete order. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddOrder = () => {
        setEditingOrder(null);
        setShowForm(true);
    };

    const handleFormSave = async (updatedOrder) => {
        setLoading(true);
        try {
            if (editingOrder) {
                await updateOrder(updatedOrder);
            } else {
                // Logic to handle adding new order
                // Example: await createOrder(updatedOrder);
            }
            setShowForm(false);
            await loadOrders(); // Reload orders after save
        } catch (error) {
            console.error('Failed to save order', error);
            setError('Failed to save order. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFormClose = () => {
        setShowForm(false);
        setEditingOrder(null);
        setError(null); // Clear any previous errors when closing form
    };

    const handleStatusChange = async (e, order) => {
        const updatedStatus = e.target.value;
        setLoading(true);
        try {
            const updatedOrder = { ...order, status: updatedStatus };
            await updateOrder(updatedOrder.order_id, updatedOrder);
            await loadOrders(); // Reload orders after status update
        } catch (error) {
            console.error('Failed to update status', error);
            setError('Failed to update status. Please try again later.');
        } finally {
            setLoading(false);
        }
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        };

    // Filter authors based on search query
    const filteredOrder = orders.filter(orders =>
        orders.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Order Management</h1>
            <button className="order-list-button-add" onClick={handleAddOrder}>Add Order</button>
            {showForm && (
                <OrderForm order={editingOrder} onSave={handleFormSave} onClose={handleFormClose} />
            )}
             <input
                type="text"
                placeholder="Search authors..."
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
                            <th>Order ID</th>
                            <th>Customer Name</th>
                            <th>addres</th>
                            <th>Order Date</th>
                            <th>Total Amount</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrder.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.user.username}</td>
                                <td>{order.address}</td>
                                <td>{new Date(order.order_date).toUTCString()}</td>
                                <td>{order.total_amount}</td>
                                <td>
                                    <select
                                        name="status"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(e, order)}
                                    >
                                        <option value="PENDING">Pending</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                                <td>{order.paymentMethods.method_name}</td>
                                <td>
                                    <button className="order-list-button-edit" onClick={() => handleEdit(order)}>Edit</button>
                                    <button className="order-list-button-delete" onClick={() => handleDelete(order.order_id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderList;
