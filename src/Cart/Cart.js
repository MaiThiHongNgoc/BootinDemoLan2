import React, { useEffect, useState } from 'react';
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from '../Backend/Service (1)/cartService';

const Cart = ({ cartId }) => {
    const [cartItems, setCartItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            setError('');
            try {
                const data = await getCartItems(cartId);
                setCartItems(data);
            } catch (error) {
                console.error('Failed to fetch cart items:', error.message);
                setError('Failed to load cart items. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [cartId]);

    if (loading) return <p>Loading cart...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Cart ID: {cartItems.cart_id}</h2>
            <h3>User Information</h3>
            <p>Username: {cartItems.user.username}</p>
            <p>Email: {cartItems.user.email}</p>
            <p>Phone: {cartItems.user.phone}</p>
            <p>Role: {cartItems.user.role.role_name}</p>

            <h3>Cart Products</h3>
            {cartItems.cart_Product.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <ul>
                    {cartItems.cart_Product.map(item => (
                        <li key={item.id}>
                            <h4>Product Name: {item.product.product_name}</h4>
                            <p>Author: {item.product.author.author_name}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Description: {item.product.description}</p>
                            <img src={item.product.imgProducts[0].img_url} alt={item.product.product_name} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
