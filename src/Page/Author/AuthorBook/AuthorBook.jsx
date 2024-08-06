import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAuthorById } from '../../../Backend/Service (1)/authorService';
import Header from '../../../Component/Header/Header';
import Footer from '../../../Component/Footer/Footer';
import { RxSlash } from "react-icons/rx";
import './AuthorBook.css';

const AuthorBook = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(authorId);
        setAuthor(data);
      } catch (error) {
        setError('Unable to fetch author details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [authorId]);

  return (
    <div>
      <Header />
      <div className='proDetail'>
        <h1 className='book-product'>Author Details</h1>
        <div className='book-bread'>
          <div className='book-crumb'>
            <Link to='/' className='book-a'>Home</Link>
            <span className='book-delimiter'>
              <i className='book-i'><RxSlash /></i>
            </span>
            <span className='book-current'>Author</span>
          </div>
        </div>
      </div>
      <div className="author-detail">
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}
        {author && (
          <>
            <div className="author-image-container">
              <img src={author.url_img} alt={author.author_name} className="author-image-detail" />
            </div>
            <div className="author-info">
              <h1 className="author-name">{author.author_name}</h1>
              <p className="author-address">Address: {author.address}</p>
              <p className="author-year-of-birth">Year of Birth: {author.year_of_birth}</p>
              <p className="author-gender">Gender: {author.gender}</p>
              <p className="author-published-books">Published Books: {author.published_book}</p>
            </div>
          </>
        )}
      </div>
      {author && (
        <div className="author-description-container">
          <p className="author-description">{author.description}</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default AuthorBook;
