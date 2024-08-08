import React, { useEffect, useState } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { getCategories } from "../Backend/Service (1)/categoryService";
import { searchProducts } from "../Backend/Service (1)/productService";
import './Search.css';

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log("Categories Data:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const results = await searchProducts(searchQuery);
      console.log("Search Results:", results);
      if (results && results.content) {
        setSearchResults(results.content);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching products:", error);
      setError('Failed to search products. Please try again.');
      setSearchResults([]);
    }
  };

  const handleProductClick = (productId) => {
    console.log(`Navigating to product with ID: ${productId}`);
    navigate(`/product/${productId}`);
  };

  return (
    <div className='search-col-lg'>
      <form className='search-ajax' onSubmit={handleSearch}>
        <div className='search-category' onClick={toggleDropdown}>
          <span className='search-pwd-drop'>Browse Category</span>
          <span className='search-caret'><RiArrowDownSLine /></span>
          <ul className={`search-menu ${isDropdownVisible ? 'visible' : ''}`}>
            {categories.map(category => (
              <li key={category.category_id}>
                <button
                  type="button"
                  onClick={() => handleCategoryChange({ target: { value: category.category_id } })}
                  className="shop-filter-button"
                >
                  {category.category_name}
                </button>
              </li>
            ))}
          </ul>
          <input type='hidden' name='search-cat' className='search-product' value={selectedCategory} />
        </div>
        <div className='search-box'>
          <button className='search-btn' type='submit'>
            <i className='search-icon'><IoSearch /></i>
          </button>
          <input
            className='search-input'
            placeholder='Search'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <ul className='search-result'>
            {searchResults.map(product => (
              <li key={product.product_id} onClick={() => handleProductClick(product.product_id)}>
                {product.product_name}
              </li>
            ))}
          </ul>
        </div>
        <input type='hidden' className='search-type' value="product" />
      </form>
    </div>
  );
};

export default Search;
