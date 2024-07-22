import React, { useEffect, useState } from 'react';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService'; // Ensure this import is correct

const Cart = () => {
    const [purchasedProducts, setPurchasedProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user_id = localStorage.getItem('user_id'); // Assume user_id is stored in localStorage

        if (token && user_id) {
            fetchPurchasedProducts(user_id);
        } else {
            setError('No token or user ID found. Please log in.');
            setLoading(false);
        }
    }, []); // Empty dependency array to run once on component mount

    const fetchPurchasedProducts = async (userId) => {
        try {
            const data = await getPurchasedProductsByUserId(userId);
            console.log('API Response:', data); // Log the entire response for debugging
            setPurchasedProducts(data);
        } catch (error) {
            console.error('Failed to fetch purchased products:', error);
            setError('Failed to load purchased products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="purchased-products-content">
            {loading && <p>Loading purchased products...</p>}
            {error && <p>{error}</p>}
            <h2>Your Purchased Products</h2>
            {purchasedProducts.length === 0 ? (
                <p>You haven't purchased any products yet!</p>
            ) : (
                <ul>
                    {purchasedProducts.map(item => (

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
