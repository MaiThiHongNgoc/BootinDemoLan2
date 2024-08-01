import React, { useEffect, useState } from 'react';
import { RiArrowDownSLine } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";
import { getCategories } from "../Backend/Service (1)/categoryService";
import './Search.css';

const Search = () => {
  const [categories, setCategories] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log(data); // Log response data to check structure
        setCategories(data); // Ensure response.data is an array
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Fallback to an empty array on error
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

  return (
    <div className='search-col-lg'>
      <form className='search-ajax'>
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
          <input className='search-input' placeholder='Search' />
          <ul className='search-result'></ul>
        </div>
        <input type='hidden' className='search-type' value="product" />
      </form>
    </div>
  );
};

export default Search;
