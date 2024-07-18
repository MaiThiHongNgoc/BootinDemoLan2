import React, { useState } from 'react';
import './Contact.css';
import { RxSlash } from "react-icons/rx";
import { BsInstagram } from "react-icons/bs";
import { BsTwitterX } from "react-icons/bs";
import { TiSocialGooglePlus } from "react-icons/ti";
import { FaFacebookF } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(false);
    setError('');

    const name = e.target[0].value;
    const email = e.target[1].value;
    const phone = e.target[2].value;
    const message = e.target[3].value;

    // Kiểm tra dữ liệu
    if (!name || !email || !phone || !message) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address !.');
      return;
    }

    if (!/^\d+$/.test(phone)) {
      setError('Please enter a valid phone number !.');
      return;
    }

    // Xử lý gửi biểu mẫu ở đây (ví dụ: gửi dữ liệu đến server)

    // Cập nhật trạng thái để hiển thị thông báo thành công
    setIsSubmitted(true);

    // Đặt lại biểu mẫu sau khi gửi thành công
    e.target.reset();
  };

  return (
    <div className="contact-main">
      <div className="contact-title">
        <div className="contact-page">
          <h1 className="contact-h1">Contact</h1>
          <div className="contact-breadcrumb">
            <div className="contact-bwp">
              <a className="contact-a" href="http://localhost:3000/">Home</a>
              <span className="contact-delimiter">
                <i className="contact-slash"><RxSlash /></i>
              </span>
              <span className="contact-current">Contact</span>
            </div>
          </div>
        </div>
      </div>
        
      <div className="contact-container">
        <div className="contact-row">
          <div className="contact-col">
            <div className="contact-main-content">
              <div className="contact-primary">
                <div className="contact-site">
                  <article className="contact-post">
                    <div className="contact-entry">
                      <div className="contact-true">
                        <div className="contact-column">
                          <div className="contact-inner">
                            <div className="contact-wbp-wrapper">
                              <div className="contact-text">
                                <div className="contact-wrapper">
                                  <h3 className="contact-address">Address</h3>
                                  <p className="contact-8a">8a Ton That Thuyet, Ha Noi</p>
                                </div>
                              </div>
                              <div className="contact-text">
                                <div className="contact-wrapper">
                                  <h3 className="contact-address">PHONE</h3>
                                  <p className="contact-8a">(+84)123456789</p>
                                </div>
                              </div>
                              <div className="contact-text">
                                <div className="contact-wrapper">
                                  <h3 className="contact-address">EMAIL</h3>
                                  <p className="contact-8a">Trung@gmail.com</p>
                                </div>
                              </div>
                              <div className="contact-text">
                                <div className="contact-wrapper">
                                  <h3 className="contact-address">OPEN TIME</h3>
                                  <p className="contact-8a">8:00Am – 10:00Pm, Sunday Close</p>
                                </div>
                              </div>
                              <div className="contact-text">
                                <h3 className="contact-info">Follow us on</h3>
                                <ul className="contact-social">
                                  <li className="contact-line">
                                    <a className="contact-ant" href="">
                                      <i className="contact-face"><FaFacebookF /></i>  
                                    </a>
                                  </li>
                                  <li className="contact-line">
                                    <a className="contact-ant" href="">
                                      <i className="contact-face"><RiLinkedinLine /></i>  
                                    </a>
                                  </li>
                                  <li className="contact-line">
                                    <a className="contact-ant" href="">
                                      <i className="contact-face"><BsInstagram /></i>  
                                    </a>
                                  </li>
                                  <li className="contact-line">
                                    <a className="contact-ant" href="">
                                      <i className="contact-face"><TiSocialGooglePlus /></i>
                                    </a>
                                  </li>
                                  <li className="contact-line">
                                    <a className="contact-ant" href="">
                                      <i className="contact-face"><BsTwitterX /></i>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="contact-column1"></div>
                        <div className="contact-column2">
                          <div className="contact-inner2">
                            <div className="contact-wbp1">
                              <div className="contact-gmaps">
                                <div className="contact-map-wrapper">
                                  <iframe className="contact-imager-map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7448.1932183791505!2d105.780424753735!3d21.028820089757623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab4cd376479b%3A0xbc2e0bb9db373ed2!2zOGEgVMO0biBUaOG6pXQgVGh1eeG6v3QsIE3hu7kgxJDDrG5oLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAxMDAwMDAsIFZpZXRuYW0!5e0!3m2!1sen!2sus!4v1720510756430!5m2!1sen!2sus"></iframe>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="contact-true-row">
                        <div className="contact-sm-9">
                          <div className='contact-vc-column'>
                            <div className='contact-wbpp'>
                              <h2 className='contact-style'>Get in Touch</h2>
                              <div className='contact-wpcf'>
                                <form className='contact-form' onSubmit={handleSubmit}>
                                  <div className='contact-us-form'>
                                    <div className='contact-roww'>                                        
                                      <div className='contact-form-required'>
                                        <p className='contact-pp'>
                                          <span className='contact-control'>
                                            <input className='contact-input' placeholder='Name' required></input>
                                          </span>
                                        </p>
                                      </div>
                                      <div className='contact-form-required'>
                                        <p className='contact-pp'>
                                          <span className='contact-control'>
                                            <input className='contact-input' placeholder='Email' required></input>
                                          </span>
                                        </p>
                                      </div>
                                      <div className='contact-form-required'>
                                        <p className='contact-pp'>
                                          <span className='contact-control'>
                                            <input className='contact-input' placeholder='Phone Number' required></input>
                                          </span>
                                        </p>
                                      </div> 
                                    </div> 
                                    <div className="contact-mes">
                                      <span className='contact-wpc8'>
                                        <textarea className='contact-textarea' placeholder='Message' required></textarea>
                                      </span> 
                                      <input className='contact-submit' type="submit" value="Send Message"></input>                                                                                                                                                   
                                      <span className='contact-spinner'></span> 
                                    </div>                                     
                                  </div>
                                </form>
                                {isSubmitted && <p className='contact-success'>Message submitted successfully!</p>}
                                {error && <p className='contact-error'>{error}</p>}
                              </div>
                            </div>
                          </div>
                        </div>            
                      </div>                               
                    </div> 
                  </article> 
                </div>                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact;
