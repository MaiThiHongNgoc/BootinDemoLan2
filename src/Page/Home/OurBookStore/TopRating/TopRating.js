import React, { useState, useEffect, useContext } from 'react';
import { getProducts } from '../../../../Backend/Service (1)/productService';
import { addProductToCart as addProductToCartService } from '../../../../Backend/Service (1)/cartItemsService';
import './TopRating.css';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../AuthContext';
import { getPurchasedProductsByUserId } from '../../../../Backend/Service (1)/cartService';

const TopRating = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [pendingProduct, setPendingProduct] = useState(null);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    loadRandomProducts();
  }, []);

  useEffect(() => {
    if (isLoggedIn && pendingProduct) {
      handleAddProductToCart(pendingProduct);
      setPendingProduct(null);
    }
  }, [isLoggedIn, pendingProduct]);

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
    console.log('Search clicked for:', product);
  };

  const handleCartClick = (product) => {
    if (!isLoggedIn) {
      setPendingProduct(product);
      setShowNotification(true);
    } else {
      handleAddProductToCart(product);
    }
  };

  const handleAddProductToCart = async (product) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (!token || !user_id) {
        setShowNotification(true);
        return;
    }

    try {
        const cartData = await getPurchasedProductsByUserId(user_id);
        console.log('Cart data:', cartData);

        // Assuming cartData is an array of carts and we need to get the first one
        if (cartData.length > 0) {
            const cartId = cartData[0].cart_id;
            console.log('Cart ID:', cartId);

            await addProductToCartService(cartId, product.product_id, 1, token);
            console.log('Product added to cart:', product);
        } else {
            console.error('No cart found for user');
            setError('No cart found for user.');
            setShowNotification(true);
        }
    } catch (error) {
        console.error('Failed to add product to cart:', error.message);
        setError('Failed to add product to cart.');
        setShowNotification(true);
    }
};

  

  const handleCloseNotification = () => {
    setShowNotification(false);
    if (!isLoggedIn) {
      navigate('/login');
    }
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
