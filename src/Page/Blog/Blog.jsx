import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxSlash } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaRegComment } from "react-icons/fa";
import Header from '../../Component/Header/Header';
//import Footer from '../../Component/Footer/Footer';
import './Blog.css';
import { Button } from '@mui/material';
import Footer from '../../Component/Footer/Footer';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };


  useEffect(() => {
    // Fetch articles from the API
    axios.get('http://localhost:9191/api/news-books/')
      .then(response => {
        setArticles(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the articles!', error);
      });
  }, []);

  return (
    <div>
      <Header />
      <div className='blog-main'>
        <div className='blog-title'>
          <div className='blog-jpg'>
            <h1 className='blog-new'>Blog</h1>
            <div className='blog-breadcrumb'>
              <div className='blog-bwp'>
                <a className='blog-a' href='http://localhost:3000/'>Home</a>
                <span className='blog-delimiter'>
                  <i className='blog-slash'><RxSlash /></i>
                </span>
                <span className='blog-current'>Blog</span>
              </div>
            </div>
          </div>
        </div>
        <div className='blog-container'>
          <div className='blog-posts'>
            <div className='blog-sidebar'>
              <aside className='blog-widget-search'>
                <form className='blog-from'>
                  <div className='blog-ner'>
                    <div className='blog-content'>
                      <input className='blog-put' placeholder='Search...'/>
                      <button className='blog-btn' type='submit'>
                        <i className='blog-fa'><CiSearch /></i>
                      </button>
                    </div>
                  </div>
                </form>
              </aside>
              <aside className='blog-widget-categories'>
                <h3 className='blog-tit'>Categories</h3>
                <ul className='blog-ul'>
                  <li className='blog-cat-item'>
                    <a className='blog-fashion' href='#'>Fashion</a> (7)
                  </li>
                  <li className='blog-cat-item'>
                    <a className='blog-fashion' href='#'>Life Style</a> (7)
                  </li>
                  <li className='blog-cat-item'>
                    <a className='blog-fashion' href='#'>Men</a> (7)
                  </li>
                  <li className='blog-cat-item'>
                    <a className='blog-fashion' href='#'>News</a> (12)
                  </li>
                  <li className='blog-cat-item'>
                    <a className='blog-fashion' href='#'>Travel</a> (7)
                  </li>
                </ul>
              </aside>
              <aside className='blog-widget-recent'>
                <div className='blog-recent'>
                  <div className='blog-block'>
                    <h3 className='blog-tit'>Recent Posts</h3>
                    <div className='blog-block-content'>
                      {/* Recent posts can be dynamic as well if needed */}
                    </div>
                  </div>
                </div>
              </aside>
              <aside className='blog-widget-archive'>
                <h3 className='blog-tit'>Archives</h3>
                <ul className='blog-out'>
                  <li className='blog-in'>
                    <a className='blog-month' href='#'>May 2018</a>
                  </li>
                  <li className='blog-in'>
                    <a className='blog-month' href='#'>April 2017</a>
                  </li>
                  <li className='blog-in'>
                    <a className='blog-month' href='#'>November 2016</a>
                  </li>
                </ul>
              </aside>
              <aside className='blog-widget-cloud'>
                <h3 className='blog-tit'>Tags</h3>
                <div className='blog-tagcloud'>
                  <a className='blog-cloud-link' href='#'>classic</a>
                  <a className='blog-cloud-link' href='#'>design</a>
                  <a className='blog-cloud-link' href='#'>fashion</a>
                  <a className='blog-cloud-link' href='#'>kid</a>
                  <a className='blog-cloud-link' href='#'>men</a>
                  <a className='blog-cloud-link' href='#'>model</a>
                  <a className='blog-cloud-link' href='#'>style</a>
                  <a className='blog-cloud-link' href='#'>woman</a>
                </div>
              </aside>
              <aside className='blog-widget-image'>
                <div className='blog-nostyle'>
                  <div className='blog-bg-banner'>
                    <div className='blog-image'>
                      <a className='blog-ton' href='#'>
                        <img className='blog-get' src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/Image-1-2.jpg" alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>

            <div className='blog-post-content'>
              {articles.map(article => (
                <div key={article.id} className='blog-post'>
                  <a className='blog-thumbnail'>
                    <img src={article.thumbnail} alt={article.title} />
                  </a>
                  <div className='blog-desc'>
                    <h2 className='blog-entry-title'>
                      <a className='blog-week' href={article.preview_Link || '#'}>{article.title}</a>
                    </h2>
                    <p className='blog-excerpt'>{article.description || 'No Description'}</p>
                  </div>
                 <div className='read-more'>
                 <a target="_blank" href={article.preview_Link || '#'}>
                  <button className='button-blog'>Read More</button>
                  </a>
                 </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
