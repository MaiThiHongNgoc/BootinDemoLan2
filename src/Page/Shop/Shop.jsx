import React, { useState, useEffect } from 'react';
import { getProducts } from '../../Backend/Service (1)/productService';
import { getCategories } from '../../Backend/Service (1)/categoryService';
import { getAuthors } from '../../Backend/Service (1)/authorService';
import { addProductToCart, updateCartItem } from '../../Backend/Service (1)/cartItemsService';
import { getPurchasedProductsByUserId } from '../../Backend/Service (1)/cartService';
import { IoSearch } from "react-icons/io5";
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import { FiSearch, FiShoppingCart, FiCheck } from "react-icons/fi";
import { RxSlash } from "react-icons/rx";
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [cartIconState, setCartIconState] = useState({});

  useEffect(() => {
    loadProducts(currentPage, selectedCategory, selectedPriceRange, selectedAuthor, searchQuery);
    loadCategories();
    loadAuthors();
  }, [currentPage, selectedCategory, selectedPriceRange, selectedAuthor, searchQuery]);

  const loadProducts = async (page, category, priceRange, author, search) => {
    setLoading(true);
    setError('');
    try {
      const response = await getProducts(page - 1, category, priceRange, author, search);
      const { content, totalPages } = response;
      setProducts(Array.isArray(content) ? content : []);
      setTotalPages(totalPages || 0);
    } catch (error) {
      console.error('Failed to fetch products', error);
      setError('Failed to load products. Please try again later.');
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const loadAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to fetch authors', error);
    }
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setSelectedPriceRange([0, value]);
  };

  const handleAuthorChange = (event) => {
    setSelectedAuthor(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    loadProducts(currentPage, selectedCategory, selectedPriceRange, selectedAuthor, searchQuery);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddProductToCart = async (product) => {
    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem('user_id');

    if (!token || !user_id) {
      setShowNotification(true);
      return;
    }

    try {
      const cartData = await getPurchasedProductsByUserId(user_id);
      if (cartData.length > 0) {
        const cartId = cartData[0].cart_id;
        const existingItem = cartData[0].cart_Product.find(item => item.product.product_id === product.product_id);

        if (existingItem) {
          await updateCartItem(existingItem.cart_item_id, {
            cart: { cart_id: cartId },
            product: { product_id: product.product_id },
            quantity: existingItem.quantity + 1,
            total_price: (existingItem.quantity + 1) * product.price
          });
        } else {
          await addProductToCart(cartId, product.product_id, 1, token);
        }

        setCartIconState(prevState => ({
          ...prevState,
          [product.product_id]: 'spinning'
        }));

        setTimeout(() => {
          setCartIconState(prevState => ({
            ...prevState,
            [product.product_id]: 'checkmark'
          }));
        }, 1000);
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

  const handleCartClick = (product) => {
    handleAddProductToCart(product);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <Header />
      <div className='shop-title'>
        <h1 className='shop-product'>Products</h1>
        <div className='shop-bread'>
          <div className='shop-crumb'>
            <a href='/' className='shop-a'>Home</a>
            <span className='shop-delimiter'>
              <i className='shop-i'><RxSlash /></i>
            </span>
            <span className='shop-current'>Products</span>
          </div>
        </div>
      </div>

      <div className="customer-shop-container">
        <div className="customer-shop-sidebar">
          <div className="shop-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="shop-search-input"
            />
            <button className='shop-btn' onClick={handleSearchClick}>
              <i className='shop-icon'><IoSearch /></i>
            </button>
          </div>
          <div className="shop-filter">
            <h3>Categories</h3>
            <ul>
              <li>
                <button onClick={() => handleCategoryChange({ target: { value: '' } })} className="shop-filter-button">
                  All Categories
                </button>
              </li>
              {categories.map(category => (
                <li key={category.category_id}>
                  <button onClick={() => handleCategoryChange({ target: { value: category.category_id } })} className="shop-filter-button">
                    {category.category_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="shop-filter">
            <h3>Price</h3>
            <div className='shop-div'>
              <div className='shop-em'>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="50" 
                  value={selectedPriceRange[1]}
                  onChange={handlePriceChange} 
                  className="shop-filter-range"
                />
              </div>
              <span id="price-display">$0 - ${selectedPriceRange[1]}</span>
            </div>
          </div>
          <div className="shop-filter">
            <h3>Authors</h3>
            <ul className='shop-ul'>
              <li>
                <button onClick={() => handleAuthorChange({ target: { value: '' } })} className="shop-filter-button">
                  All Authors
                </button>
              </li>
              {authors.map(author => (
                <li key={author.author_id}>
                  <button onClick={() => handleAuthorChange({ target: { value: author.author_id } })} className="shop-filter-button">
                    {author.author_name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="customer-shop-content">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div>
              <div className="customer-shop-grid">
                {products.map((product) => (
                  <div key={product.product_id} className="customer-shop-card">
                    <div className="customer-shop-image-container">
                      <img src={product.imgProducts[0]?.img_url} alt={product.product_name} className="customer-shop-image" />
                      <div className="customer-shop-icons">
                        <button onClick={() => handleSearchClick(product)}>
                          <FiSearch />
                        </button>
                        <button
                          onClick={() => handleCartClick(product)}
                          className={`cart-icon ${cartIconState[product.product_id]}`}
                        >
                          {cartIconState[product.product_id] === 'checkmark' ? <FiCheck /> : <FiShoppingCart />}
                        </button>
                      </div>
                    </div>
                    <h2 className="customer-shop-product-name">{product.product_name}</h2>
                    <p className="customer-shop-author-name">{product.author.author_name}</p>
                    <p className="customer-shop-price">Price: ${product.price}</p>
                  </div>
                ))}
              </div>
              <div className="customer-pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showNotification && (
        <div className="login-required-message">
         <p>Please log in to add items to the cart. <a href="/login">Log in here</a></p>
         <button className="close-button" onClick={handleCloseNotification}>×</button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Shop;
