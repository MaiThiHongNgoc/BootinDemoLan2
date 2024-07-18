  import React, { useState, useEffect } from 'react';
  import { createOrder, updateOrder, fetchPaymentMethods } from '../Service/orderService';
  import './orderForm.css';

  const OrderForm = ({ order, onSave }) => {
    const [formData, setFormData] = useState({
      user: {
        user_id: '',
      },
      address: '',
      total_amount: '',
      paymentMethods: {
        payment_method_id: ''
      }
    });
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
      if (order) {
        setFormData({
          user: {
            user_id: order.user.user_id,
          },
          address: order.address,
          total_amount: order.total_amount,
          paymentMethods: {
            payment_method_id: order.paymentMethods.payment_method_id,
          }
        });
      } else {
        setFormData({
          user: {
            user_id: '',
          },
          address: '',
          total_amount: '',
          paymentMethods: {
            payment_method_id: ''
          }
        });
      }

      const loadPaymentMethods = async () => {
        try {
          const response = await fetchPaymentMethods();
          setPaymentMethods(response.data);
        } catch (error) {
          console.error('Failed to fetch payment methods', error);
          setError('Failed to load payment methods');
        }
      };

      loadPaymentMethods();
    }, [order]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name.startsWith('user.')) {
        setFormData({
          ...formData,
          user: {
            ...formData.user,
            [name.split('.')[1]]: value  
          }
        });
      } else if (name.startsWith('paymentMethods.')) {
        setFormData({
          ...formData,
          paymentMethods: {
            ...formData.paymentMethods,
            [name.split('.')[1]]: value
          }
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.user.user_id || !formData.address || !formData.total_amount || !formData.paymentMethods.payment_method_id) {
        setError('Please fill out all fields');
        return;
      }
      setError('');
      try {
        if (order) {
          await updateOrder(order.order_id, formData);
        } else {
          await createOrder(formData);
        }
        setFormData({
          user: {
            user_id: '',
          },
          address: '',
          total_amount: '',
          paymentMethods: {
            payment_method_id: ''
          }
        });
        onSave(); // Notify parent component of successful save
      } catch (error) {
        console.error('Failed to save order', error);
        setError('Failed to save order');
      }
    };

    return (
      <form className="order-form" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <div>
          <label>User ID</label>
          <input
            type="number"
            name="user.user_id"
            value={formData.user.user_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Amount</label>
          <input
            type="number"
            name="total_amount"
            value={formData.total_amount}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Payment Method ID</label>
          <select
            name="paymentMethods.payment_method_id"
            value={formData.paymentMethods.payment_method_id}
            onChange={handleChange}
          > 
            <option value="">Select Payment Method...</option>
            {paymentMethods.map(method => (
              <option key={method.payment_method_id} value={method.payment_method_id}>
                {method.method_name}
              </option>
            ))}
          </select>
        </div>
        <button className="order-form-button-save" type="submit">Save</button>
      </form>
    );
  };

  export default OrderForm;
