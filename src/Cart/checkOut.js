import React, { useState, useEffect } from 'react';
import { createOrder, fetchPaymentMethods } from '../Backend/Service (1)/orderService';
import { createOrderDetail } from '../Backend/Service (1)/orderDetailService';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService';
import { deleteCartItem } from '../Backend/Service (1)/cartItemsService';
import { showMessage } from './utils'; // Import showMessage function
import './CheckOut.css';

const CheckOut = () => {
  const user_id = localStorage.getItem('user_id');
  const [formData, setFormData] = useState({
    user: { user_id: user_id },
    first_name: '',
    last_name: '',
    address: '',
    paymentMethods: { payment_method_id: '' },
    total_amount: '',
    status: 'PENDING'
  });
  const [formOrderDetail, setFormOrderDetail] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [deleteCart, setDeleteCart] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartOrders = await getPurchasedProductsByUserId();
        if (!cartOrders || !Array.isArray(cartOrders)) {
          console.error('Invalid data format:', cartOrders);
          return;
        }

        const allCartProducts = cartOrders.flatMap(order => order.cart_Product || []);
        setCartItems(allCartProducts);
        setDeleteCart(allCartProducts);

        const paymentMethodResponse = await fetchPaymentMethods();
        if (Array.isArray(paymentMethodResponse)) {
          setPaymentMethods(paymentMethodResponse);
        } else {
          console.error('Payment methods data is not an array:', paymentMethodResponse);
        }

        if (!user_id) {
          console.error('User ID not found in localStorage');
          return;
        }

        if (allCartProducts.length > 0) {
          const orderDetails = allCartProducts.map(item => ({
            orders: { order_id: item.cart.cart_id },
            products: { product_id: item.product.product_id },
            quantity: item.quantity
          }));
          setFormData(prevState => ({
            ...prevState,
            user: { user_id: user_id },
            total_amount: allCartProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
            status: 'PENDING'
          }));
          setFormOrderDetail(orderDetails);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'payment_payment_method_id') {
      setFormData(prevState => ({
        ...prevState,
        paymentMethods: {
          payment_method_id: value
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const deleteCarts = async () => {
    try {
      await Promise.all(deleteCart.map(item => deleteCartItem(item.cart_item_id)));
      setCartItems([]);
      setDeleteCart([]);
      console.log('Cart items deleted successfully.');
    } catch (error) {
      console.error('Error deleting cart items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderResponse = await createOrder(formData);
      const orderId = orderResponse.order_id;
      if (!orderId) {
        throw new Error('Invalid order ID');
      }

      const orderDetailsPromises = formOrderDetail.map(detail => {
        const orderDetailPayload = {
          ...detail,
          orders: { order_id: orderId }
        };
        return createOrderDetail(orderDetailPayload);
      });

      const orderDetailsResponses = await Promise.all(orderDetailsPromises);
      console.log('Order details created:', orderDetailsResponses);

      await deleteCarts();

      showMessage('Đặt hàng thành công!', 'success');
    } catch (error) {
      if (error.response) {
        console.error('Error creating order:', error.response.data);
        showMessage('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.', 'error');
      } else if (error.request) {
        console.error('Error creating order: No response received from server');
        showMessage('Không nhận được phản hồi từ máy chủ. Vui lòng thử lại.', 'error');
      } else {
        console.error('Error creating order:', error.message);
        showMessage('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.', 'error');
      }
    }
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <input
          className="form-input"
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <div className="form-group">
          <label>Select payment method:</label>
          {paymentMethods.length > 0 ? (
            paymentMethods.map(method => (
              <div key={method.payment_method_id} className="form-check">
                <div className='form-check-display'>
                  <input
                    type="radio"
                    id={`payment_method_${method.payment_method_id}`}
                    name="payment_payment_method_id"
                    value={method.payment_method_id.toString()} // Ensure value is a string
                    checked={formData.paymentMethods.payment_method_id === method.payment_method_id.toString()} // Ensure type consistency
                    onChange={handleChange}
                    className="form-check-input"
                    required
                  />
                  <label htmlFor={`payment_method_${method.payment_method_id}`} className="form-check-label">
                    {method.method_name}
                  </label>
                </div>
                {method.description && <p className="payment-method-description">{method.description}</p>}
              </div>
            ))
          ) : (
            <p>No payment methods available.</p>
          )}
        </div>

        <div className="cart-items-container">
          <h3>Cart Items:</h3>
          <table className="cart-items-table">
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
              {cartItems.map(item => (
                <tr key={item.cart_item_id}>
                  <td>{item.product.product_name}</td>
                  <td>${item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>{item.product.description}</td>
                  <td>
                    {item.product.imgProducts && item.product.imgProducts.length > 0 && (
                      <img
                        src={item.product.imgProducts[0].img_url}
                        alt={item.product.imgProducts[0].img_name}
                        className="product-image"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckOut;
