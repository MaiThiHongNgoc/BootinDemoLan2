import React, { useState, useEffect } from 'react';
import { createOrderDetail, updateOrderDetail } from '../Service (1)/orderDetailService';
import './orderDetailForm.css';

const OrderDetailForm = ({ orderDetail, onSave }) => {
    const [formData, setFormData] = useState({
        orders: { order_id: '' },
        products: { product_id: '' },
        quantity: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (orderDetail) {
            setFormData({
                orders: { order_id: orderDetail.orders.order_id},
                products: { product_id: orderDetail.products.product_id},
                quantity: orderDetail.quantity
            });
        } else {
            setFormData({
                orders: { order_id: '' },
                products: { product_id: '' },
                quantity: ''
            });
        }
    }, [orderDetail]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedValue = value !== '' ? parseInt(value, 10) : ''; // Parse value to integer if not empty
            if (name === 'order_id') {
                return {
                    ...prevState,
                    orders: { order_id: updatedValue }
                };
            } else if (name === 'product_id') {
                return {
                    ...prevState,
                    products: { product_id: updatedValue }
                };
            } else {
                return { ...prevState, [name]: updatedValue };
            }
        });
    };


    const validate = () => {
        let tempErrors = {};
        if (!formData.orders.order_id) tempErrors.order_id = "Order ID is required.";
        if (!formData.products.product_id) tempErrors.product_id = "Product ID is required.";
        if (!formData.quantity) tempErrors.quantity = "Quantity is required.";
        return tempErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tempErrors = validate();
        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const dataToSubmit = {
                orders: { order_id: formData.orders.order_id },
                products: { product_id: formData.products.product_id },
                quantity: formData.quantity
            };
            if (orderDetail) {
                await updateOrderDetail(orderDetail.order_detail_id, dataToSubmit);
            } else {
                await createOrderDetail(dataToSubmit);
            }
            setFormData({
                orders: { order_id: '' },
                products: { product_id: '' },
                quantity: ''
            });
            onSave();
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setErrors({ submit: 'Error: ' + error.response.data.message });
            } else if (error.request) {
                console.error('Error request:', error.request);
                setErrors({ submit: 'Error: No response from server.' });
            } else {
                console.error('Error message:', error.message);
                setErrors({ submit: 'Error: ' + error.message });
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <form className="order-detail-form" onSubmit={handleSubmit}>
            <div>
                <label>Order ID</label>
                <input
                    type="number"
                    name="order_id"
                    value={formData.orders.order_id}
                    onChange={handleChange}
                />
                {errors.order_id && <span className="error">{errors.order_id}</span>}
            </div>
            <div>
                <label>Product ID</label>
                <input
                    type="number"
                    name="product_id"
                    value={formData.products.product_id}
                    onChange={handleChange}
                />
                {errors.product_id && <span className="error">{errors.product_id}</span>}
            </div>
            <div>
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                />
                {errors.quantity && <span className="error">{errors.quantity}</span>}
            </div>
            {errors.submit && <span className="error">{errors.submit}</span>}
            <button className="order-detail-form-button-save" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save'}
            </button>
        </form>
    );
};

export default OrderDetailForm;
