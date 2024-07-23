import React, { useEffect, useState, useRef } from 'react';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService'; // Ensure this import is correct
import './Cart.css'; // Import the CSS file for styling

const Cart = ({ userId, onClose }) => {
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const cartRef = useRef();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getPurchasedProductsByUserId(userId);
                console.log("Fetched Data:", data); // Debugging fetched data
                if (Array.isArray(data) && data.length > 0) {
                    const cartData = data[0];
                    setPurchasedProducts(cartData.cart_Product || []);
                } else {
                    console.error("Unexpected data structure:", data);
                    setError('Unexpected data structure');
                }
            } catch (error) {
                console.error("Error fetching data:", error); // Debugging error
                setError('Failed to fetch purchased products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [userId]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                onClose();
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="cart-overlay">
            <div className="cart-container" ref={cartRef}>
                {loading && <p>Loading purchased products...</p>}
                {error && <p>{error}</p>}
                <h2>Your Purchased Products</h2>
                {purchasedProducts.length === 0 ? (
                    <p>You haven't purchased any products yet!</p>
                ) : (
                    <ul className="cart-products-list">
                        {purchasedProducts.map(item => (
                            <li key={item.cart_item_id} className="cart-product-item">
                                <h4>Product Name: {item.product.product_name}</h4>
                                <p>Author: {item.product.author.author_name}</p>
                                <p>Price: ${item.product.price}</p>
                                <p>Quantity: {item.quantity}</p>
                                {item.product.imgProducts && item.product.imgProducts.length > 0 && (
                                    <img src={item.product.imgProducts[0].img_url} alt={item.product.product_name} />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Cart;
