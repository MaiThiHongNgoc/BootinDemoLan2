import React from 'react'
import { RxSlash } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { LuClock9 } from "react-icons/lu";
import { FaUser } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import Header from '../../Component/Header/Header';
import Footer from '../../Component/Footer/Footer';
import './Blog.css'

const Blog = () => {
  return (
    <div>
       <Header />
    <div className='blog-main'>
      <div className='blog-title'>
        <div className='blog-jpg'>
          <h1 className='blog-new'>Blog</h1>
          <div className='blog-breadcrumb'>
            <div className='blog-bwp'>
              <a className='blog-a'href='http://localhost:3000/'>Home</a>
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
                  <a className='blog-fashion' href='#'>Life Stylel</a> (7)
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
                    <div className='blog-row'>
                      <div className='blog-grid'>
                        <a className='blog-thumbnail' href='#'>
                          <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/05/Image-1-720x484.jpg" alt="Book news missed  this week" />
                        </a>
                        <div className='blog-desc'>
                          <span className='blog-entry-date'>
                            <time className='blog-date' dateTime='2018-05-30T04:42:28+00:00'>May 30, 2018</time>
                          </span>
                          <h2 className='blog-entry-title'>
                            <a className='blog-week' href='#'>Book news missed  this week</a>
                          </h2>
                        </div>
                      </div>
                      <div className='blog-grid'>
                        <a className='blog-thumbnail' href='#'>
                          <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/05/Image-2-1-720x484.jpg" alt="Book fashion for  children" />
                        </a>
                        <div className='blog-desc'>
                          <span className='blog-entry-date'>
                            <time className='blog-date' dateTime='2018-05-30T04:42:28+00:00'>May 30, 2018</time>
                          </span>
                          <h2 className='blog-entry-title'>
                            <a className='blog-week' href='#'>Book fashion for  children</a>
                          </h2>
                        </div>
                      </div>
                      <div className='blog-grid'>
                        <a className='blog-thumbnail' href='#'>
                          <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/05/Image-3-1-720x484.jpg" alt="Walk Around With Streetwear" />
                        </a>
                        <div className='blog-desc'>
                          <span className='blog-entry-date'>
                            <time className='blog-date' dateTime='2018-05-30T04:42:28+00:00'>May 30, 2018</time>
                          </span>
                          <h2 className='blog-entry-title'>
                            <a className='blog-week' href='#'>Walk Around With Streetwear</a>
                          </h2>
                        </div>
                      </div>
                      <div className='blog-grid'>
                        <a className='blog-thumbnail' href='#'>
                          <img src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2017/04/Image-4-720x484.jpg" alt="Lorem ipsum dolor sit amet enim" />
                        </a>
                        <div className='blog-desc'>
                          <span className='blog-entry-date'>
                            <time className='blog-date' dateTime='2017-04-19T12:02:43+00:00'>April 19, 2017</time>
                          </span>
                          <h2 className='blog-entry-title'>
                            <a className='blog-week' href='#'>Lorem ipsum dolor sit amet enim</a>
                          </h2>
                        </div>
                      </div>
                    </div>
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
            <section className='blog-content-area'>
              <div className='blog-site'>
                <div className='blog-list-post'>
                  <article className='blog-post-3976'>
                    <div className='blog-single-thumb'>
                      <a href='#' className='blog-nail'>
                        <img src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/05/Image-1.jpg' className='blog-full'/>
                      </a>
                    </div>
                    <div className='blog-post-conte'>
                      <div className='post-category'>
                        <a href='#'>Life Style</a>
                      </div>
                      <h3 className='blog-entry'>
                        <a href="#">Book news missed  this week</a>
                      </h3>
                      <div className='blog-entry-meta'>
                        <div className='blog-post-buton'>
                          <i className='blog-clock'><LuClock9 /></i>
                          <span className='blog-mark'>
                            <a className='blog-rel' href="#">
                              <time datetime="2024-01-03T10:38:01+00:00">January 3, 2024</time>
                            </a>
                          </span>
                        </div>
                        <span className='blog-meta-link'>
                          <i className='blog-user'><FaUser /></i>
                          <a className='blog-admin' href='#'>admin</a>
                        </span>
                        <span className='blog-comments-link'>
                          <i className='blog-comments'><FaRegComment /></i>
                          1
                          <span>Comment</span>
                        </span>
                      </div>
                      <p className='blog-excerpt'>
                        Nunc aliquet, justo non commodo congue, velit sem pulvinar enim, ac bibendum mi mi eget libero. Maecenas 
                      ac viverra enim, et laoreet lacus. Etiam nisi diam, sagittis ac quam at, posuere hendrerit eros. Praesent 
                      aliquam tincidunt tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit....
                      </p>
                      <a className='blog-read' href='#'>Read more</a>
                    </div>
                  </article>
                  <article className='blog-post-3976'>
                    <div className='blog-single-thumb'>
                      <a href='#' className='blog-nail'>
                        <img src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/05/Image-1.jpg' className='blog-full'/>
                      </a>
                    </div>
                    <div className='blog-post-conte'>
                      <div className='post-category'>
                        <a href='#'>Life Style</a>
                      </div>
                      <h3 className='blog-entry'>
                        <a href="#">Book news missed  this week</a>
                      </h3>
                      <div className='blog-entry-meta'>
                        <div className='blog-post-buton'>
                          <i className='blog-clock'><LuClock9 /></i>
                          <span className='blog-mark'>
                            <a className='blog-rel' href="#">
                              <time datetime="2024-01-03T10:38:01+00:00">January 3, 2024</time>
                            </a>
                          </span>
                        </div>
                        <span className='blog-meta-link'>
                          <i className='blog-user'><FaUser /></i>
                          <a className='blog-admin' href='#'>admin</a>
                        </span>
                        <span className='blog-comments-link'>
                          <i className='blog-comments'><FaRegComment /></i>
                          1
                          <span>Comment</span>
                        </span>
                      </div>
                      <p className='blog-excerpt'>
                        Nunc aliquet, justo non commodo congue, velit sem pulvinar enim, ac bibendum mi mi eget libero. Maecenas 
                      ac viverra enim, et laoreet lacus. Etiam nisi diam, sagittis ac quam at, posuere hendrerit eros. Praesent 
                      aliquam tincidunt tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit....
                      </p>
                      <a className='blog-read' href='#'>Read more</a>
                    </div>
                  </article>
                  <article className='blog-post-3976'>
                    <div className='blog-single-thumb'>
                      <a href='#' className='blog-nail'>
                        <img src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/05/Image-1.jpg' className='blog-full'/>
                      </a>
                    </div>
                    <div className='blog-post-conte'>
                      <div className='post-category'>
                        <a href='#'>Life Style</a>
                      </div>
                      <h3 className='blog-entry'>
                        <a href="#">Book news missed  this week</a>
                      </h3>
                      <div className='blog-entry-meta'>
                        <div className='blog-post-buton'>
                          <i className='blog-clock'><LuClock9 /></i>
                          <span className='blog-mark'>
                            <a className='blog-rel' href="#">
                              <time datetime="2024-01-03T10:38:01+00:00">January 3, 2024</time>
                            </a>
                          </span>
                        </div>
                        <span className='blog-meta-link'>
                          <i className='blog-user'><FaUser /></i>
                          <a className='blog-admin' href='#'>admin</a>
                        </span>
                        <span className='blog-comments-link'>
                          <i className='blog-comments'><FaRegComment /></i>
                          1
                          <span>Comment</span>
                        </span>
                      </div>
                      <p className='blog-excerpt'>
                        Nunc aliquet, justo non commodo congue, velit sem pulvinar enim, ac bibendum mi mi eget libero. Maecenas 
                      ac viverra enim, et laoreet lacus. Etiam nisi diam, sagittis ac quam at, posuere hendrerit eros. Praesent 
                      aliquam tincidunt tempor.Lorem ipsum dolor sit amet, consectetur adipiscing elit....
                      </p>
                      <a className='blog-read' href='#'>Read more</a>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default Blog