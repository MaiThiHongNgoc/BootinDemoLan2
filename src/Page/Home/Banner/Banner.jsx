import React, { useState } from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';

const Banner = ({ alt }) => {
  // Sử dụng một object để lưu trạng thái zoom cho từng ảnh
  const [zoomed, setZoomed] = useState({});

  // Hàm xử lý di chuột vào - cập nhật trạng thái zoom cho ảnh cụ thể
  const handleMouseEnter = (id) => {
    setZoomed({ ...zoomed, [id]: true });
  };

  // Hàm xử lý di chuột ra - xóa trạng thái zoom cho ảnh cụ thể
  const handleMouseLeave = (id) => {
    setZoomed({ ...zoomed, [id]: false });
  };

  // Mảng các ảnh để hiển thị
  const images = [
    { id: 1, src: "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/04/banner3-3.jpg", title: "Travel Books Summer", info: "45% OFF", className:"image-1"},
    { id: 2, src: "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/04/banner3-4.jpg", title: "Cooking Books", info: "60% OFF",  className:"image-2"},
    { id: 3, src: "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/04/banner3-5.jpg", title: "Design Books 2024", info: "50% OFF",  className:"image-3"}
  ];

  return (
    <div className="banner">
      {images.map((image) => (
        <div key={image.id} className="banner-item">
          <div
            className={`banner-img ${zoomed[image.id] ? 'zoomed' : ''}`}
            onMouseEnter={() => handleMouseEnter(image.id)}
            onMouseLeave={() => handleMouseLeave(image.id)}
          >
            <img src={image.src} alt={alt || 'Zoomable Image'} />
            <div className="banner-info">
              <p className='banner-p'>{image.info}</p>
              <h3 className='banner-h3'>{image.title}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Banner;
