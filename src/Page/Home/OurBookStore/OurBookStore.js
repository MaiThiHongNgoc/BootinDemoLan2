import React,{useState} from 'react'
import { Link,Outlet } from 'react-router-dom'
import './OurBookStore.css'

const OurBookStore = () => {
  const [activeLink, setActiveLink] = useState(null);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  return (
    <div className='our-book-store'>
      <h1>Our Book Store</h1>
      <div className='our-book-store-links'>
        <Link
          to='/topRating'
          className={activeLink === 'topRating' ? 'our-book-store-link active' : 'our-book-store-link'}
          onClick={() => handleLinkClick('topRating')}
        >
          Top Rating
        </Link>
        <Link
          to='/bestSeller'
          className={activeLink === 'bestSeller' ? 'our-book-store-link active' : 'our-book-store-link'}
          onClick={() => handleLinkClick('bestSeller')}
        >
          Best Sellers
        </Link>
        <Link
          to='/featured'
          className={activeLink === 'featured' ? 'our-book-store-link active' : 'our-book-store-link'}
          onClick={() => handleLinkClick('featured')}
        >
          Featured
        </Link>
      </div>
      <Outlet/>
    </div>
  );
};

export default OurBookStore;