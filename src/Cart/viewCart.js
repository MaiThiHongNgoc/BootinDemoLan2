import React, { useEffect, useState, useContext } from 'react';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService';
import { CartContext } from './CartContext'; // Adjust path accordingly
import { updateCartItem, deleteCartItem } from '../Backend/Service (1)/cartItemsService';
import { mergeProducts } from './productUtils';
import { AiFillDelete } from "react-icons/ai";
import './ViewCart.css';

const ViewCart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { cartUpdated, updateCart } = useContext(CartContext);

    useEffect(() => {
        const fetchCartItems = async () => {
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
    }, [userId, cartUpdated]);

    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return; // Ensure quantity is at least 1
        try {
            await updateCartItem(userId, productId, newQuantity);
            updateCart(cartItems.map(item =>
                item.product.product_id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            ));
        } catch (error) {
            setError('Failed to update item quantity');
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await deleteCartItem(userId, productId);
            updateCart(cartItems.filter(item => item.product.product_id !== productId));
        } catch (error) {
            setError('Failed to remove item from cart');
        }
    };

    if (loading) {
        return <p className="viewcart-loading">Loading cart items...</p>;
    }

    return (
        <div className="viewcart-container">
            <div className='view_table1'>
                <h2 className="viewcart-title">Your Cart</h2>
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
                                <tr key={item.product.product_id}>
                                    <td>
                                        {item.product.imgProducts && item.product.imgProducts.length > 0 && (
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
                                            onChange={(e) => handleQuantityChange(item.product.product_id, parseInt(e.target.value, 10))}
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
                                        <button className="viewcart-remove-button" onClick={() => handleRemoveItem(item.product.product_id)}>
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
            </div>
        </div>
    );
};

export default ViewCart;
