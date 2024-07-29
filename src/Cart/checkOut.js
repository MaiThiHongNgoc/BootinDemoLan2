import React, { useState, useEffect } from 'react';
import { createOrder, fetchPaymentMethods } from '../Backend/Service (1)/orderService';
import { createOrderDetail } from '../Backend/Service (1)/orderDetailService';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService';
import { deleteCartItem } from '../Backend/Service (1)/cartItemsService';
import { showMessage } from './message'; // Import showMessage function
import { PayPalButton } from 'react-paypal-button-v2'; // Import PayPalButton
import { RxSlash } from 'react-icons/rx';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
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
  const [paymentMethods, setPaymentMethods] = useState([]); // Add state for payment methods

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart items
        const cartOrders = await getPurchasedProductsByUserId();
        if (!cartOrders || !Array.isArray(cartOrders)) {
          console.error('Invalid data format:', cartOrders);
          return;
        }

        // Extract and process cart products
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
            orders: { order_id: item.cart.cart_id }, // assuming cart_id maps to order_id
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
    if (name.startsWith('user_')) {
      setFormData(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          [name.replace('user_', '')]: value
        }
      }));
    } else if (name.startsWith('payment_')) {
      setFormData(prevState => ({
        ...prevState,
        paymentMethods: {
          ...prevState.paymentMethods,
          [name.replace('payment_', '')]: value
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
    } catch (error) {
      if (error.response) {
        console.error('Error creating order:', error.response.data);
      } else if (error.request) {
        console.error('Error creating order: No response received from server');
      } else {
        console.error('Error creating order:', error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className='checkout'>
        <div className='checkout-page'>
          <div className='checkout-content'>
            <h1 className='checkout-header'>CheckOut</h1>
            <div className='checkout-breadcrumb'>
              <div className='checkout-path'>
                <a className='checkout-link' href='#'>Home</a>
                <span className='checkout-delimiter'>
                  <i className='checkout-icon'><RxSlash /></i>
                </span>
                <span className='checkout-current'>CheckOut</span>
              </div>
            </div>
          </div>
        </div>
        <div className='checkout-container'>
          <form className='checkout-on' onSubmit={handleSubmit}>
            <div className='checkout-details'>
              <h3 className='checkout-h3'>Billing details</h3>
              <div className='checkout-form'>
                <p className='check-first'>
                  <label className='check-name'>First name</label>
                  <span className='check-given'>
                    <input className='checkout-text'
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </p>
                <p className='check-last'>
                  <label className='check-name'>Last name</label>
                  <span className='check-given'>
                    <input className='checkout-text'
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </p>
                <p className='check-first'>
                  <label className='check-name'>Address</label>
                  <span className='check-given'>
                    <input className='checkout-text'
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </p>
                <p className='check-fir'>
                  <label className='check-name'>Payment ID</label>
                  <span className='check-amount'>
                    <input className='checkout-ment'
                      type="number"
                      name="payment_payment_method_id"
                      value={formData.paymentMethods.payment_method_id}
                      onChange={handleChange}
                      required
                    />
                  </span>
                </p>
              </div>
            </div>
            <div className='checkout-cart'>
              <h3>Cart Items</h3>
              <div className='checkout-order'>
                <div className='checkout-shop'>
                  <table>
                    <thead>
                      <tr>
                        <th>Product Name</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody className='checkout-id'>
                      {cartItems.map(item => (
                        <tr className='checkout-tr' key={item.cart_item_id}>
                          <td className='checkout-td'>{item.product.product_name} x {item.quantity}</td>
                          <td className='checkout-td'>${(item.product.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="paypal-button-container">
                    <PayPalButton
                      amount={formData.total_amount}
                      onSuccess={(details, data) => {
                        alert("Transaction completed by " + details.payer.name.given_name);
                        handleSubmit(); // Call handleSubmit to create the order in your backend
                      }}
                      options={{
                        clientId: "AW0tj92Vn8SKiT2ATHitvUrd4yDJYuxG0iau6Rc6a82z06ZuiLxKldbh-EPQOobFV8SPQ9Mz3pKCRPto" // Replace with your PayPal client ID
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckOut;
