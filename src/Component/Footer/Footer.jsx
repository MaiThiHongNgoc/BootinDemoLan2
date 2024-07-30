import React from 'react'
import { Link } from 'react-router-dom';
import './Footer.css';
import { RiMapPinLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGoogle } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { TiSocialLinkedin } from "react-icons/ti";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <div className='footer-data'>
          <div className='footer-padding_1'>
            <div className='footer-column'>
              <div className='footer-wrapper'>
                <h2 className='footer-title'>contact us</h2>
                <div className='footer-text'>
                  <div className='footer-wpb'>
                    <p className='footer-line'>
                    <i className='footer-map'><RiMapPinLine /></i>
                     Số 8 Tôn Thất Thuyết-Nam Từ Liêm-Hà Nội.</p>
                    <ul className='footer-mail'>
                      <i className='footer-email'><MdOutlineEmail /></i>
                      <li className='footer-diep'>quachdangdiep@gmail.com</li>
                      <li className='footer-diep'>support@gmail.com</li>
                    </ul>
                    <ul className='footer-out'>
                      <i className='footer-phone'><IoPhonePortraitOutline /></i>
                      <li className='footer-diep'>( 84) 0123 456 789</li>
                      <li className='footer-diep'>( 84) 0987 654 321</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-padding_2'>
            <div className='footer-column'>
              <div className='footer-wrapper'>
                <h2 className='footer-for'>Information</h2>
                <div className='footer-text'>
                  <div className='footer-wpb'>
                    <ul className='footer-link'>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Contact Us</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Site Map</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Privacy Policy</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>About Us</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Costumer Service</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-padding_3'>
            <div className='footer-column'>
              <div className='footer-wrapper'>
                <h2 className='footer-le'>My Account</h2>
                <div className='footer-text'>
                  <div className='footer-wpb'>
                    <ul className='footer-link'>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Sign In</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>View Cart</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>My Wishtlist</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Track My Order</a>
                      </li>
                      <li className='footer-st'>
                        <a href='#' className='footer-ss'>Help</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-padding_4'>
            <div className='footer-column'>
              <div className='footer-wrapper'>
                <div className='footer-slider'>
                  <div className='footer-book'>
                    <div className='footer-ins'>
                      <h2 className='footer-tit'>Instagram</h2>
                    </div>
                    <div className='footer-gram'>
                      <div className='footer-carousel'>
                        <div className='footer-draggable'>
                          <div className='footer-track'>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/5.jpg' alt></img>
                              </a>
                            </div>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/4.jpg' alt></img>
                              </a>
                            </div>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/3.jpg' alt></img>
                              </a>
                            </div>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/5.jpg' alt></img>
                              </a>
                            </div>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/4.jpg' alt></img>
                              </a>
                            </div>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/3.jpg' alt></img>
                              </a>
                            </div>
                            <div className='footer-image'>
                              <a className='footer-a' href='#'>
                                <img className='footer-img' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/5.jpg' alt></img>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='footer-element'>
                  <div className='footer-per'>
                    <p className='footer-me'>7 Days A Week From 8.00 Am To 5 Pm</p>
                  </div>
                </div>
                <div className='footer-content'>
                  <div className='footer-per'>
                    <ul className='footer-social'>
                      <li className='footer-to'>
                        <a href='#' className='footer-week'>
                          <i className='footer-face'><FaFacebookF /></i>
                        </a>
                      </li>
                      <li className='footer-to'>
                        <a href='#' className='footer-week'>
                          <i className='footer-twitter'><RiTwitterXFill /></i>
                        </a>
                      </li>
                      <li className='footer-to'>
                        <a href='#' className='footer-week'>
                          <i className='footer-google'><FaGoogle /></i>
                        </a>
                      </li>
                      <li className='footer-to'>
                        <a href='#' className='footer-week'>
                          <i className='footer-instagram'><IoLogoInstagram /></i>
                        </a>
                      </li>
                      <li className='footer-to'>
                        <a href='#' className='footer-week'>
                          <i className='footer-Linkedin'><TiSocialLinkedin /></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='footer-fluid'>
            <div className='footer-left'>
              <div className='footer-222'>
                <div className='footer-ft'>
                  <div className='footer-coppyleft'>
                    <div className='footer-ft'>
                      <p className='footer-bootin'>
                        Copyright © 2024
                        <a href='#' className='footer-ef'>
                           Bootin 
                        </a>
                           - Made by Nhom1
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='footer-right'>
              <div className='footer-400'>
                <div className='footer-ht'>
                  <div className='footer-coppyright'>
                    <figure className='footer-figure'>
                      <img className='footer-lazy' src='https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2018/06/paymet.png'/>
                    </figure>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;