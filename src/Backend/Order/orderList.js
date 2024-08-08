import React, { useState, useEffect } from 'react';
import { getOrder, updateOrder, deleteOrder } from '../Service (1)/orderService';
import './orderList.css';
import OrderForm from './orderForm';
import OrderDetails from './orderDetail';
import { Link, useParams } from 'react-router-dom';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchStatus, setSearchStatus] = useState('');
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const { status } = useParams(); // Get status from URL params

    useEffect(() => {
        console.log(status)
        if (status) {
            setSearchStatus(status);
        }
        loadOrders();
    }, [status]);

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
            loadOrders();
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
        loadOrders();
    };

    const handleStatusChange = async (e, order) => {
        const updatedStatus = e.target.value;

        if (order.status === 'CANCELLED') {
            alert('Cannot change the status of a cancelled order.');
            return;
        }

        if (order.status === 'COMPLETED') {
            alert('Cannot change the status of a completed order.');
            return;
        }

        const isConfirmed = window.confirm("You have comment change status");
        if (!isConfirmed) {
            return;
        }

        const updatedOrder = { ...order, status: updatedStatus };

        const payload = {
            order_id: updatedOrder.order_id,
            user: { user_id: updatedOrder.user.user_id },
            first_name: updatedOrder.first_name,
            last_name: updatedOrder.last_name,
            address: updatedOrder.address,
            phone_number: updatedOrder.phone_number,
            email: updatedOrder.email,
            paymentMethods: { payment_method_id: updatedOrder.paymentMethods.payment_method_id },
            total_amount: updatedOrder.total_amount,
            status: updatedStatus
        };

        setLoading(true);
        try {
            await updateOrder(updatedOrder.order_id, payload);
            loadOrders();
        } catch (error) {
            setError(`Failed to update status: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setSearchStatus(e.target.value);
    };

    const handleToggleDetails = (order_id) => {
        setExpandedOrderId(expandedOrderId === order_id ? null : order_id);
    };

    const filteredOrders = orders
        .filter(order => {
            const isUsernameMatch = order.user.username.toLowerCase().includes(searchQuery.toLowerCase());
            const isFirstName = order.first_name.toLowerCase().includes(searchQuery.toLowerCase());
            const isLastName = order.last_name.toLowerCase().includes(searchQuery.toLowerCase());
            const email = order.user.email.toLowerCase().includes(searchQuery.toLowerCase());

            const orderDate = new Date(order.order_date);
            const isDateInRange = startDate && endDate
                ? orderDate >= new Date(startDate) && orderDate <= new Date(endDate)
                : true;

            const isStatusMatch = searchStatus ? order.status === searchStatus : true;

            return (isUsernameMatch || isFirstName || isLastName || email) && isDateInRange && isStatusMatch;
        })
        .sort((a, b) => b.order_id - a.order_id);

    const getStatusClass = (status) => {
        switch (status) {
            case 'PENDING':
                return 'select-status-pending';
            case 'COMPLETED':
                return 'select-status-completed';
            case 'PROCESSING':
                return 'select-status-processing';
            case 'CANCELLED':
                return 'select-status-cancelled';
            default:
                return '';
        }
    };

    return (
        <div className="container">
        <h1>Order Management</h1>
        {showForm && (
            <OrderForm
                order={editingOrder}
                onSave={handleFormClose}
                refreshOrders={refreshOrders}
            />
        )}
        <div className="filter-pagination-container">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search orders by username, first name, last name, or email..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="order-search"
                />
                <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="order-search-date"
                />
                <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="order-search-date"
                />
                <select
                    value={searchStatus}
                    onChange={handleStatusFilterChange}
                    className="order-search-status"
                >
                    <option className='option-status-pending' value="Pending">Pending</option>
                                            <option className='option-status-completed' value="Paid">Paid</option>
                                            <option className='option-status-processing' value="Packaging">Packaging</option>
                                            <option className='option-status-cancelled' value="Shipping">Shipping</option>
                                            <option className='option-status-cancelled' value="Delivered">Delivered</option>
                                            <option className='option-status-cancelled' value="Cancelled">Cancelled</option>
                </select>
            </div>
        </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <table className="order-list-table">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Order Date</th>
                            <th>Status</th>
                            <th>Payment Method</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <React.Fragment key={order.order_id}>
                                <tr>
                                    <td>{order.order_id}</td>
                                    <td>{order.user.username}</td>
                                    <td>{order.first_name}</td>
                                    <td>{order.last_name}</td>
                                    <td>{order.address}</td>
                                    <td>{new Date(order.order_date).toLocaleString()}</td>
                                    <td>
                                        <select
                                            name="status"
                                            value={order.status}
                                            className={getStatusClass(order.status)}
                                            onChange={(e) => handleStatusChange(e, order)}
                                        >
                                            <option className='option-status-pending' value="Pending">Pending</option>
                                            <option className='option-status-completed' value="Paid">Paid</option>
                                            <option className='option-status-processing' value="Packaging">Packaging</option>
                                            <option className='option-status-cancelled' value="Shipping">Shipping</option>
                                            <option className='option-status-cancelled' value="Delivered">Delivered</option>
                                            <option className='option-status-cancelled' value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>{order.paymentMethods.method_name}</td>
                                    <td>
                                        <button className="order-list-button-edit" onClick={() => handleEdit(order)}>Edit</button>
                                        <button className="order-list-button-delete" onClick={() => handleDelete(order.order_id)}>Delete</button>
                                    </td>
                                    <td>
                                        <Link to={`/admin/orderdetail/${order.order_id}`} className="order-list-button-details">View Details</Link>
                                    </td>
                                </tr>

                                {expandedOrderId === order.order_id && (
                                    <tr>
                                        <td colSpan="12">
                                            <OrderDetails order={order} />
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
