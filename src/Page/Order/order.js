import React, { useState, useEffect } from 'react';
import { createOrder } from '../../Backend/Service (1)/orderService';
import { createOrderDetail } from '../../Backend/Service (1)/orderDetailService';
import { getPurchasedProductsByUserId } from '../../Backend/Service (1)/cartService';

const CreateOrderForm = ({ orderDetail }) => {
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Nhận dữ liệu từ API
                const cartOrders = await getPurchasedProductsByUserId();
                console.log('Cart orders:', cartOrders);
                
                // Kiểm tra dữ liệu trả về từ API
                if (!cartOrders || !Array.isArray(cartOrders)) {
                    console.error('Invalid data format:', cartOrders);
                    return;
                }
    
                // Flatten the cart orders if needed and extract cart_Product
                const allCartProducts = cartOrders.flatMap(order => order.cart_Product || []);
                console.log('All Cart Products:', allCartProducts);
                
                setCartItems(allCartProducts); // Lưu trữ các sản phẩm trong giỏ hàng
    
                
                console.log('User ID from localStorage:', user_id);
                if (!user_id) {
                    console.error('User ID not found in localStorage');
                    return;
                }
    
                if (orderDetail) {
                    const orderDetails = allCartProducts.map(item => ({
                        products: { product_id: item.product.product_id },
                        quantity: item.quantity,
                        total_price: item.total_price
                    }));
                    console.log('Order Details:', orderDetails);
    
                    setFormData(prevState => ({
                        ...prevState,
                        user: { user_id: user_id },  // Lấy user_id từ formData
                        total_amount: allCartProducts.reduce((acc, item) => acc + item.total_price, 0),
                        status: 'PENDING'
                    }));
                    
                    setFormOrderDetail(orderDetails);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [orderDetail]);
    
    

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('Submitting formData:', formData);
    
            // Create the order and get the new order ID
            const orderResponse = await createOrder(formData);
            const orderId = orderResponse.order_id;
            console.log('Order created:', orderId);
    
            if (!orderId) {
                throw new Error('Invalid order ID');
            }
    
            // Create order details with the new order ID
            const orderDetailsPromises = formOrderDetail.map(detail =>
                createOrderDetail({
                    orders: { order_id: orderId },
                    ...detail
                })
            );
    
            // Wait for all order details to be created
            const orderDetailsResponses = await Promise.all(orderDetailsPromises);
            console.log('Order details created:', orderDetailsResponses);
            
            // Perform actions after successful submission, e.g., redirect
            // window.location.href = '/success-page';
        } catch (error) {
            console.error('Error creating order:', error.response ? error.response.data : error.message);
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="payment_payment_method_id"
                placeholder="Payment Method ID"
                value={formData.paymentMethods.payment_method_id}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="total_amount"
                placeholder="Total Amount"
                value={formData.total_amount}
                onChange={handleChange}
                required
            />
            <div>
                <h3>Cart Items:</h3>
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
                        {cartItems.map(item => (
                            <tr key={item.cart_item_id}>
                                <td>{item.product.product_name}</td>
                                <td>${item.product.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.total_price}</td>
                                <td>{item.product.description}</td>
                                <td>
                                    {item.product.imgProducts && item.product.imgProducts.length > 0 && (
                                        <img
                                            src={item.product.imgProducts[0].img_url}
                                            alt={item.product.imgProducts[0].img_name}
                                            className="product-image"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default CreateOrderForm;
