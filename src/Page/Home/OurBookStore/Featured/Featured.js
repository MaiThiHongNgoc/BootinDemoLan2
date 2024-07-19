import React, { useState, useEffect } from 'react';
import { getProducts } from '../../../../Backend/Service (1)/productService';
import { FiSearch, FiShoppingCart } from 'react-icons/fi'; // Import icons from react-icons
import { useNavigate } from 'react-router-dom'; 
import '../TopRating/TopRating.css';

const Featured = () => {
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

  const handleCartClick = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowNotification(true); // Show message to log in
      return;
    }

    // Decode the token to get user role information
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jwtPayload = JSON.parse(atob(base64));
    const userRole = jwtPayload.scope; // Assuming role is stored in the JWT payload

    if (userRole !== 'USER') {
      setShowNotification(true); // Show message to log in
      return;
    }

    // Handle add to cart logic
    console.log('Add to cart clicked for:', product);
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

export default Featured;
