import React, { useState, useEffect } from 'react';
import { createOrder, fetchPaymentMethods } from '../Backend/Service (1)/orderService';
import { createOrderDetail } from '../Backend/Service (1)/orderDetailService';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService';
import { deleteCartItem } from '../Backend/Service (1)/cartItemsService';
import { showMessage } from './message';
import { PayPalButton } from 'react-paypal-button-v2';
import Header from '../Component/Header/Header'
import Footer from '../Component/Footer/Footer'
import { useNavigate } from 'react-router-dom';


import './CheckOut.css';

const CheckOut = () => {
  const user_id = localStorage.getItem('user_id');
  const [formData, setFormData] = useState({
    user: { user_id: user_id },
    first_name: '',
    last_name: '',
    address: '',
    phone_number: '',
    email: '',
    paymentMethods: { payment_method_id: '' },
    total_amount: '',
    status: 'PENDING'
  });
  const [formOrderDetail, setFormOrderDetail] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [deleteCart, setDeleteCart] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

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
            total_amount: allCartProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2),
            status: 'PENDING'
          }));
          setFormOrderDetail(orderDetails);

          // Tính tổng số lượng và tổng tiền
          const totalQty = allCartProducts.reduce((acc, item) => acc + item.quantity, 0);
          const totalCost = allCartProducts.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
          setTotalQuantity(totalQty);
          setTotalPrice(totalCost);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('payment')) {
      setFormData(prevState => ({
        ...prevState,
        paymentMethods: { payment_method_id: value }
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

  const handleSubmit = async () => {
     // Xác nhận trước khi thanh toán
    const isConfirmed = window.confirm("Are you sure you want to proceed with the payment?");
    if (!isConfirmed) {
    return; // Dừng lại nếu người dùng không xác nhận
    }
    const requiredFields = [
      'first_name', 'last_name', 'address', 'phone_number', 'email', 'paymentMethods_payment_method_id'
    ];
  
   // Kiểm tra các trường bắt buộc
   const missingFields = requiredFields.filter(field => {
    if (field === 'paymentMethods_payment_method_id') {
      return !formData.paymentMethods.payment_method_id;
    }
    return !formData[field];
  });
  
  
  if (missingFields.length > 0) {
    missingFields.forEach(field => {
      const fieldElement = document.querySelector(`[name="${field}"]`);
      if (fieldElement) {
        fieldElement.classList.add('error');
      }
    });
    showMessage('Please fill out all required fields.', 'error');
    return;
  }

  
    try {
      // Tạo đơn hàng
      const orderResponse = await createOrder(formData);
      const order_id = orderResponse.order_id; // Giả sử API trả về ID đơn hàng
  
      // Tạo chi tiết đơn hàng
      const orderDetailsPromises = formOrderDetail.map(detail => {
        const orderDetailPayload = {
          ...detail,
          orders: { order_id: order_id }
        };
        return createOrderDetail(orderDetailPayload);
      });
  
      const orderDetailsResponses = await Promise.all(orderDetailsPromises);
      console.log('Order details created:', orderDetailsResponses);
  
      // Xóa các mặt hàng trong giỏ hàng
       await deleteCarts();
       
       navigate(`/bill/${order_id}`);
      // Hiển thị thông báo thành công và làm sạch localStorage
      showMessage('Order placed successfully!', 'success');  
    } catch (error) {
      if (error.response) {
        console.error('Error creating order:', error.response.data);
        showMessage('An error occurred while creating the order. Please try again.', 'error');
      } else if (error.request) {
        console.error('Error creating order: No response received from server');
        showMessage('No response received from the server. Please try again.', 'error');
      } else {
        console.error('Error creating order:', error.message);
        showMessage('An error occurred while creating the order. Please try again.', 'error');
      }

    }

  };


  return (
    <div>
      <Header />
      <div className='checkout-page'></div>
      <div className="checkout-container">
        <div className="checkout-form-section">
          {/* <h2 className='check-h2'>Billing details</h2> */}
          <form className="checkout-form" onSubmit={e => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group required">
                <input
                  className="form-input"
                  type="text"
                  name="first_name"
                  placeholder="First Name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group required">
                <input
                  className="form-input"
                  type="text"
                  name="last_name"
                  placeholder="Last Name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group required">
              <input
                className="form-input"
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group required">
              <input
                className="form-input"
                type="text"
                name="phone_number"
                placeholder="Phone Number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group required">
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </form>
        </div>
        <div className="checkout-summary-section">

          <table className="checkout-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item.product.product_id}>
                  <td>{item.product.product_name}</td>
                  <td>${item.product.price.toFixed(2)}</td>
                  <td>{item.quantity}</td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="summary-row">
                <td colSpan="3" className="summary-label">Total Quantity:</td>
                <td colSpan="2">{totalQuantity}</td>
              </tr>
              <tr className="summary-row">
                <td colSpan="3" className="summary-label">Total Price:</td>
                <td colSpan="2">${totalPrice.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

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
          <div className="paypal-button-container">
            <PayPalButton
              amount={formData.total_amount}
              onSuccess={() => handleSubmit()}
              options={{
                clientId: "AW0tj92Vn8SKiT2ATHitvUrd4yDJYuxG0iau6Rc6a82z06ZuiLxKldbh-EPQOobFV8SPQ9Mz3pKCRPto"
              }}
            />
          </div>
          <button type="button" className="submit-button" onClick={handleSubmit}>
            Place Order
          </button>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
