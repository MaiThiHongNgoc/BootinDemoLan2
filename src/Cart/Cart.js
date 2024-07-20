import React, { useEffect, useState } from 'react';
import { getCartItems, addCartItem } from '../Backend/Service (1)/cartService'; // Ensure this import is correct

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newItem, setNewItem] = useState({ productId: '', quantity: 1 });
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userId = JSON.parse(atob(token.split('.')[1])).user_id;
            fetchCartItems(userId);
        } else {
            setError('No token found. Please log in.');
            setLoading(false);
        }
    }, []); // Empty dependency array to run once on component mount

    const fetchCartItems = async (userId) => {
        try {
            const response = await getCartItems(userId);
            const data = await response.json(); // Assuming the API returns JSON
            setCartItems(data.cart_products); // Use the correct field from the response
        } catch (error) {
            console.error('Failed to fetch cart items:', error);
            setError('Failed to load cart items. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            setError('No token found. Please log in.');
            return;
        }

        setAdding(true);
        try {
            const userId = JSON.parse(atob(token.split('.')[1])).user_id;
            await addCartItem({ ...newItem, userId });
            fetchCartItems(userId); // Refresh cart items after adding
            setNewItem({ productId: '', quantity: 1 }); // Reset form
        } catch (error) {
            console.error('Failed to add cart item:', error);
            setError('Failed to add item to cart. Please try again later.');
        } finally {
            setAdding(false);
        }
    };

    return (
        <div>
            {loading && <p>Loading cart...</p>}
            {error && <p>{error}</p>}
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            <h3>{item.product.product_name}</h3>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </li>
                    ))}
                </ul>
            )}
            <h3>Add Item to Cart</h3>
            <form onSubmit={handleAddItem}>
                <label>
                    Product ID:
                    <input
                        type="text"
                        value={newItem.productId}
                        onChange={(e) => setNewItem({ ...newItem, productId: e.target.value })}
                        required
                    />
                </label>
                <label>
                    Quantity:
                    <input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) })}
                        min="1"
                        required
                    />
                </label>
                <button type="submit" disabled={adding}>
                    {adding ? 'Adding...' : 'Add to Cart'}
                </button>
            </form>
        </div>
    );
};

export default Cart;
