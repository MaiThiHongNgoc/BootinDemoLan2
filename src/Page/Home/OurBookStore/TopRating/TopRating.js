import React, { useState, useEffect } from 'react';
import { getProducts } from '../../../../Backend/Service (1)/productService';
import { addCartItem } from '../../../../Backend/Service (1)/cartService'; // Import the addCartItem function
import './TopRating.css';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const TopRating = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadRandomProducts();
  }, []);

  const loadRandomProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts();
      const allProducts = response.content;
      const randomProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 10);
      setProducts(randomProducts);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = (product) => {
    // Handle search click logic
    console.log('Search clicked for:', product);
  };

  const handleCartClick = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
        setShowNotification(true); // Show message to log in
        return;
    }

    try {
        // Construct the cart item object
        const cartItem = {
            cart: { cart_id:1}, // Example cart ID, you may need to dynamically get this
            product: {
                product_id: product.product_id
            },
            quantity: 1 // Default quantity
        };

        // Add item to cart
        await addCartItem(cartItem);

        // Optionally, show success message or update cart state
        console.log('Product added to cart:', product);
    } catch (error) {
        console.error('Failed to add product to cart:', error);
        setShowNotification(true); // Show error message
    }
};

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className='top-rating'>
      <div className="top-rating-container">
        {loading && <p className="top-rating-loading">Loading...</p>}
        {error && <p className="top-rating-error">{error}</p>}
        {showNotification && (
          <div className="login-required-message">
            <p>Please log in to add items to the cart. <a href="/login">Log in here</a></p>
            <button className="close-button" onClick={handleCloseNotification}>×</button>
          </div>
        )}
        <div className="top-rating-grid">
          {products.map((product) => (
            <div key={product.product_id} className="top-rating-card">
              <div className="top-rating-image-container">
                <img src={product.imgProducts[0]?.img_url} alt={product.product_name} className="top-rating-image" />
                <div className="top-rating-icons">
                  <button onClick={() => handleSearchClick(product)}>
                    <FiSearch />
                  </button>
                  <button onClick={() => handleCartClick(product)}>
                    <FiShoppingCart />
                  </button>
                </div>
              </div>
              <h2 className="top-rating-product-name">{product.product_name}</h2>
              <p className="top-rating-author-name">{product.author.author_name}</p>
              <p className="top-rating-price">Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRating;
