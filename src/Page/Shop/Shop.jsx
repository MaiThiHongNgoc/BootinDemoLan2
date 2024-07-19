import React, { useState, useEffect } from 'react';
import { getProducts } from '../../Backend/Service (1)/productService';
import { getCategories } from '../../Backend/Service (1)/categoryService';
import { getAuthors } from '../../Backend/Service (1)/authorService';
import { IoSearch } from "react-icons/io5";
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { RxSlash } from "react-icons/rx";
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000]);
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginRequired, setLoginRequired] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchClick = (product) => {
    // Implement search click functionality
  };

  const handleCartClick = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowNotification(true); // Show notification if not logged in
      return;
    }

    // Decode the token to get user role information
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jwtPayload = JSON.parse(atob(base64));
    const userRole = jwtPayload.scope; // Assuming role is stored in the JWT payload

    if (userRole !== 'USER') {
      setShowNotification(true); // Show notification if role is not 'USER'
      return;
    }

    // Handle add to cart logic
    console.log('Add to cart clicked for:', product);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <Header />
      <div className='shop-title'>
        <h1 className='shop-product'>Products</h1>
        <div className='shop-bread'>
          <div className='shop-crumb'>
            <a href='#' className='shop-a'>Home</a>
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
            <button className='shop-btn'>
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
                <span>
                  <input className='shop-ton' value="anna-hillton" name='filter_author' type='checkbox'/>
                </span>
                <button onClick={() => handleAuthorChange({ target: { value: '' } })} className="shop-filter-ton">
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
          ) : error ? (
            <p>{error}</p>
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
                        <button onClick={() => handleCartClick(product)}>
                          <FiShoppingCart />
                        </button>
                      </div>
                    </div>
                    <h2 className="customer-shop-product-name">{product.product_name}</h2>
                    <p className="customer-shop-author-name">{product.author.author_name}</p>
                    <p className="customer-shop-price">Price: ${product.price}</p>
                  </div>
                ))}
              </div>
              {/* Pagination */}
              <ul className="customer-pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index} className={`customer-page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(index + 1)} className="customer-page-link">
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <Footer />
      
      {/* Notification Message */}
      {showNotification && (
        <div className='login-required-message'>
          <span>Please log in to add items to the cart. <a href="/login">Log in here</a></span>
          <button className='close-button' onClick={handleCloseNotification}>×</button>
        </div>
      )}
    </div>
  );
};

export default Shop;
