import React, { useEffect, useState, useContext } from 'react';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService';
import { CartContext } from './CartContext'; // Điều chỉnh đường dẫn theo yêu cầu
import { updateCartItem, deleteCartItem } from '../Backend/Service (1)/cartItemsService';
import { mergeProducts } from './productUtils';
import { RxSlash } from 'react-icons/rx';
import { AiFillDelete } from 'react-icons/ai';
import Header from '../Component/Header/Header';
import Footer from '../Component/Footer/Footer';
import './ViewCart.css';
import { Link } from 'react-router-dom';

const ViewCart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { cartUpdated, updateCart } = useContext(CartContext);

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getPurchasedProductsByUserId(userId);
                if (Array.isArray(data) && data.length > 0) {
                    const cartData = data[0];
                    const { mergedProducts, totalQuantity, totalPrice } = mergeProducts(cartData.cart_Product || []);
                    setCartItems(mergedProducts);
                    setTotalQuantity(totalQuantity);
                    setTotalPrice(totalPrice);
                } else {
                    setError('Unexpected data structure');
                    setCartItems([]);
                    setTotalQuantity(0);
                    setTotalPrice(0);
                }
            } catch (error) {
                setError('Failed to fetch cart items');
                setCartItems([]);
                setTotalQuantity(0);
                setTotalPrice(0);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return; // Đảm bảo số lượng ít nhất là 1
    
        try {
            const itemToUpdate = cartItems.find(item => item.product.product_id === productId);
            if (!itemToUpdate) {
                throw new Error('Item to update not found.');
            }
            
            const data = await getPurchasedProductsByUserId(userId);
            const cart_id = data[0].cart_id;
            
            const updatedItem = {
                cart: { cart_id },
                product: { product_id: productId },
                quantity: newQuantity,
                total_price: newQuantity * itemToUpdate.product.price
            };
    
            // Cập nhật thông tin giỏ hàng
            await updateCartItem(itemToUpdate.cart_item_id, updatedItem);
    
            // Cập nhật giỏ hàng trong trạng thái
            const updatedCartItems = cartItems.map(item =>
                item.product.product_id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            );
    
            setCartItems(updatedCartItems);
            setTotalQuantity(updatedCartItems.reduce((acc, item) => acc + item.quantity, 0));
            setTotalPrice(updatedCartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0));
            updateCart(updatedCartItems);
        } catch (error) {
            setError('Failed to update item quantity');
            console.error('Quantity update error:', error);
        }
    };
    

    const handleRemoveItem = async (cartItemId) => {
        try {
            await deleteCartItem(cartItemId);
            const updatedCartItems = cartItems.filter(item => item.cart_item_id !== cartItemId);

            // Cập nhật trạng thái
            const updatedTotalQuantity = updatedCartItems.reduce((acc, item) => acc + item.quantity, 0);
            const updatedTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);

            setCartItems(updatedCartItems);
            setTotalQuantity(updatedTotalQuantity);
            setTotalPrice(updatedTotalPrice);
            updateCart(updatedCartItems);
        } catch (error) {
            setError('Failed to remove item from cart');
            console.error('Remove item error:', error);
        }
    };

    if (loading) {
        return <p className="viewcart-loading">Loading cart items...</p>;
    }

    return (
        <div>
            <Header />
            <div className='viewcart-page'>
                <div className='viewcart-content'>
                    <h1 className='viewcart-header'>Cart</h1>
                    <div className='viewcart-breadcrumb'>
                        <div className='viewcart-path'>
                            <a className='viewcart-link' href='#'>Home</a>
                            <span className='viewcart-delimiter'>
                                <i className='viewcart-icon'><RxSlash /></i>
                            </span>
                            <span className='viewcart-current'>Cart</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="viewcart-container">
                <div className='view_table1'>
                    {error && <p className="viewcart-error">{error}</p>}
                    <table className="viewcart-products-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Subtotal</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => {
                                const subtotal = item.quantity * item.product.price;
                                return (
                                    <tr key={item.cart_item_id}>
                                        <td>
                                            {item.product.imgProducts?.[0]?.img_url && (
                                                <img src={item.product.imgProducts[0].img_url} alt={item.product.product_name} className="viewcart-product-image" />
                                            )}
                                        </td>
                                        <td>
                                            <div className='viewcart-product-details'>
                                                <h4 className="viewcart-product-name">{item.product.product_name}</h4>
                                                <p className="viewcart-product-author">{item.product.author.author_name}</p>
                                            </div>
                                        </td>
                                        <td className="viewcart-product-price">${item.product.price}</td>
                                        <td className="viewcart-quantity">
                                            <button
                                                className="quantity-button"
                                                onClick={() => handleQuantityChange(item.product.product_id, item.quantity - 1)}
                                            >
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                id={`quantity-${item.product.product_id}`}
                                                className='input-quantity'
                                                min="1"
                                                value={item.quantity}
                                                onChange={(e) => {
                                                    const newQuantity = parseInt(e.target.value, 10);
                                                    if (!isNaN(newQuantity)) {
                                                        handleQuantityChange(item.product.product_id, newQuantity);
                                                    }
                                                }}
                                            />
                                            <button
                                                className="quantity-button"
                                                onClick={() => handleQuantityChange(item.product.product_id, item.quantity + 1)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td className="viewcart-product-subtotal">${subtotal.toFixed(2)}</td>
                                        <td>
                                            <button className="viewcart-remove-button" onClick={() => handleRemoveItem(item.cart_item_id)}>
                                                <AiFillDelete />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="viewcart-summary">
                        <h3>Cart Summary</h3>
                        <p>Total Quantity: {totalQuantity}</p>
                        <p>Total Price: ${totalPrice.toFixed(2)}</p>
                    </div>
                    <button className="viewcart-remove-button">
                        <Link to="/checkout">Proceed to Checkout</Link>
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ViewCart;
