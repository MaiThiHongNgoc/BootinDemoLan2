import React, { useState, useEffect } from 'react';
import { getAuthors } from '../../Backend/Service (1)/authorService';
import { Link } from 'react-router-dom';
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import './Author.css';
import { RxSlash } from "react-icons/rx";

const Author = () => {
  const [authors, setAuthors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage] = useState(8); // Number of authors per page

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      const data = await getAuthors();
      setAuthors(data);
    } catch (error) {
      console.error('Failed to fetch authors', error);
    }
  };

  // Logic for pagination
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = authors.slice(indexOfFirstAuthor, indexOfLastAuthor);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <Header/>
        <div className='author-title'>
          <h1 className='author-product'>Product Author</h1>
          <div className='author-bread'>
            <div className='author-crumb'>
              <Link to='/' className='author-a'>Home</Link>
              <span className='author-delimiter'>
                <i className='author-i'><RxSlash /></i>
              </span>
              <span className='author-current'>Product Author</span>
            </div>
          </div>
        </div>
    
    <div className="customer-author-container">
      <div className="customer-author-grid">
        {currentAuthors.map((author) => (
          <div key={author.author_id} className="customer-author-card">
            <div className="customer-author-image-container">
              <img src={author.url_img} alt={author.author_name} className="customer-author-image" />
            </div>
            <Link to={`/author/${author.author_id}`} className="customer-author-product-name">
              <span>{author.author_name}</span>
            </Link>
            <p>Published Books: {author.published_book}</p>
          </div>
        ))}
      </div>
      {/* Pagination */}
      <ul className="customer-pagination">
        {Array.from({ length: Math.ceil(authors.length / authorsPerPage) }, (_, index) => (
          <li key={index} className={`customer-page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="customer-page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
    <Footer/>
    </div>
  );
};

export default Author;
