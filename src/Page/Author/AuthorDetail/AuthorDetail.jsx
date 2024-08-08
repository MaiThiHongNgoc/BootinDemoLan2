import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RxSlash } from "react-icons/rx";
import { TiSocialFacebook } from "react-icons/ti";
import { TiSocialGooglePlus } from "react-icons/ti";
import { TiSocialTwitter } from "react-icons/ti";
import Header from '../../../Component/Header/Header';
import Footer from '../../../Component/Footer/Footer';
import './AuthorDetail.css';
import { getAuthorById } from '../../../Backend/Service (1)/authorService';

const AuthorDetail = () => {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const data = await getAuthorById(authorId);
        setAuthor(data);
      } catch (error) {
        console.error('Failed to fetch author details', error);
      }
    };
    fetchAuthor();
  }, [authorId]);

  if (!author) {
    return <p>Loading author details...</p>;
  }

  return (
    <div>
      <Header/>
    <div className='detail-title'>
      <div className='detail-jpg'>
        <h1 className='detail-new'>Author Detail</h1>
        <div className='detail-breadcrumb'>
          <div className='detail-bwp'>
            <a className='detail-a' href='http://localhost:3000/'>Home</a>
            <span className='detail-delimiter'>
              <i className='detail-slash'><RxSlash /></i>
              Author
            </span>
            <span className='detail-delimiter'>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div className='detail-container'>
      <div className='detail-author'>
        <div className='detail-url'>
          <img className='detail-img' src={author.url_img} alt={author.author_name} />
        </div>
      <div className='detail-info'>
      <h1>{author.author_name}</h1>
            <p>Bio: {author.description}</p>
            <p>Address: {author.address}</p>
            <p>Year of Birth: {author.year_of_birth}</p>
            <p>Gender: {author.gender}</p>
            <p>Published Books: {author.published_book}</p>
      {/* Hiển thị thêm thông tin nếu cần */}
      <ul className='detail-ul'>
        <li>
          <a href='#'>
            <i className='detail-social'><TiSocialFacebook /></i>
          </a>
        </li>
        <li>
          <a href='#'>
            <i className='detail-social'><TiSocialTwitter /></i>
          </a>
        </li>
        <li>
          <a href='#'>
            <i className='detail-social'><TiSocialGooglePlus /></i>
          </a>
        </li>
      </ul>
      </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AuthorDetail;
