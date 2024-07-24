import React, { useEffect, useState, useRef, useContext } from 'react';
import { getPurchasedProductsByUserId } from '../Backend/Service (1)/cartService';
import { CartContext } from './CartContext'; // Adjust path accordingly
import { mergeProducts } from './productUtils'; // Adjust path accordingly
import { Link } from 'react-router-dom'; // Import Link
import './Cart.css';

const Cart = ({ userId, onClose }) => {
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const cartRef = useRef();
    const { cartUpdated } = useContext(CartContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getPurchasedProductsByUserId(userId);
                if (Array.isArray(data) && data.length > 0) {
                    const cartData = data[0];
                    const { mergedProducts, totalQuantity, totalPrice } = mergeProducts(cartData.cart_Product || []);
                    setPurchasedProducts(mergedProducts);
                    setTotalQuantity(totalQuantity);
                    setTotalPrice(totalPrice);
                } else {
                    setError('Unexpected data structure');
                    setPurchasedProducts([]);
                    setTotalQuantity(0);
                    setTotalPrice(0);
                }
            } catch (error) {
                setError('Failed to fetch purchased products');
                setPurchasedProducts([]);
                setTotalQuantity(0);
                setTotalPrice(0);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [userId, cartUpdated]);

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

    // Ensure purchasedProducts is an array
    const validProducts = Array.isArray(purchasedProducts) ? purchasedProducts : [];

    return (
        <div className="cart-overlay">
            <div className="cart-container" ref={cartRef}>
                {loading && <p className="cart-loading">Loading purchased products...</p>}
                {error && <p className="cart-error">{error}</p>}
                <h2 className="cart-title">Your Purchased Products</h2>
                {validProducts.length === 0 ? (
                    <p className="cart-empty">You haven't purchased any products yet!</p>
                ) : (
                    <>
                        <ul className="cart-products-list">
                            {validProducts.map(item => (
                                <li key={item.product.product_id} className="cart-product-item">
                                    {item.product.imgProducts && item.product.imgProducts.length > 0 && (
                                        <img src={item.product.imgProducts[0].img_url} alt={item.product.product_name} className="cart-product-image" />
                                    )}
                                    <div className='cart-product-details'>
                                        <h4 className="cart-product-name">{item.product.product_name}</h4>
                                        <p className="cart-product-author">{item.product.author.author_name}</p>
                                        <p className="cart-product-price">{item.quantity} x ${item.product.price}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="cart-summary">
                            <p className='cart-product-price2'>Total Quantity: {totalQuantity}</p>
                            <p className='cart-product-price2'>Total Price: ${totalPrice.toFixed(2)}</p>
                        </div>
                    </>
                )}
                <div className="cart-buttons">
                     <Link to="/viewcart" className="cart-button cart-view-button">
                        <span className="button-content">View Cart</span>
                     </Link>
                    <Link to="/checkout" className="cart-button cart-checkout-button">
                         <span className="button-content">Checkout</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
