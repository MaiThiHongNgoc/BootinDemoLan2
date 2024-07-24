import React, { useState, useEffect } from 'react';
import { getOrderDetails, deleteOrderDetail } from '../Service (1)/orderDetailService';
import OrderDetailForm from './orderDetailForm'; // Assuming this is your component name for order detail form
import './orderDetailList.css'; // Update CSS import as needed

const OrderDetailList = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [editingOrderDetail, setEditingOrderDetail] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadOrderDetails();
    }, []);

    const loadOrderDetails = async () => {
        try {
            const response = await getOrderDetails(0); // Assuming pagination, pass appropriate page number
            setOrderDetails(response.data.content || []); // Ensure `response.data.content` is always an array
        } catch (error) {
            console.error('Failed to fetch order details', error);
        }
    };

    const handleEdit = (orderDetail) => {
        setEditingOrderDetail(orderDetail);
        setShowForm(true);
    };

    const handleDelete = async (orderDetailId) => {
        try {
            await deleteOrderDetail(orderDetailId);
            loadOrderDetails();
        } catch (error) {
            console.error('Failed to delete order detail', error);
        }
    };

    const handleAddOrderDetail = () => {
        setEditingOrderDetail(null);
        setShowForm(true);
    };

    const handleFormClose = () => {
        setShowForm(false);
        loadOrderDetails();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter orderDetails based on search query
    const filteredOrderDetail = (orderDetails || []).filter(orderDetail =>
        orderDetail.orders.user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="order-detail-container">
            <h1>Order Detail Management</h1>
            <button className="order-detail-button-add" onClick={handleAddOrderDetail}>Add Order Detail</button>
            {showForm && (
                <OrderDetailForm orderDetail={editingOrderDetail} onSave={handleFormClose} />
            )}
            <input
                type="text"
                placeholder="Search authors..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="order-search"
            />
            <table className="order-detail-table">
                <thead>
                    <tr>
                        <th>OrderDetail ID</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Payment Methods</th>
                        <th>Total amount</th>
                        <th>Order Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredOrderDetail.map((orderDetail) => (
                        <tr key={orderDetail.order_detail_id}>
                            <td>{orderDetail.order_detail_id}</td>
                            <td>{orderDetail.orders.user.username}</td>
                            <td>{orderDetail.orders.user.email}</td>
                            <td>{orderDetail.orders.user.phone}</td>
                            <td>{orderDetail.orders.address}</td>
                            <td>{orderDetail.products.product_name}</td>
                            <td>{orderDetail.quantity}</td>
                            <td>{orderDetail.products.price}/1</td>
                            <td>{orderDetail.orders.paymentMethods.method_name}</td>
                            <td>{orderDetail.orders.total_amount}$</td>
                            <td>{new Date(orderDetail.orders.order_date).toUTCString()}</td>
                            <td>{orderDetail.orders.status}</td>
                            <td>
                                <button className="order-detail-button-edit" onClick={() => handleEdit(orderDetail)}>Edit</button>
                                <button className="order-detail-button-delete" onClick={() => handleDelete(orderDetail.order_detail_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderDetailList;
