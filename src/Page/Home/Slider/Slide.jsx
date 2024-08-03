import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './Slide.css';
import { Link } from 'react-router-dom';

const Slideshow = () => {
  const images = [
    "https://png.pngtree.com/thumb_back/fw800/background/20230905/pngtree-a-handwritten-book-with-flowers-tied-to-it-image_13258605.jpg",
    "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider1-1.jpg",
    "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider5-3.jpg",
  ];

  return (
    <Slide
      duration={3000}
      transitionDuration={1000}
      indicators={false}   // Tắt thanh điều hướng (dots)
      arrows={false}       // Tắt các điều khiển chuyển slide
    >
      {images.map((image, index) => (
        <div className="slide-container" key={index} style={{ backgroundImage: `url(${image})` }}>
          <div className={`title title${index + 1}`}>
            <div className="box-title4">
              <h3>{index === 2 ? "collection book 2024 " : "collection book 2024 "}</h3>
            </div>
            <div className='box-title1'>
              <h3>{index === 0 ? "Explore the world of books" : index === 1 ? "Books You Should Read" : "Good Books for Life"}</h3>
            </div>
            <div className="box-title2">
              <h3>{index === 2 ? "40% DISCOUNT BOOKS DESIGN" : "40% DISCOUNT BOOKS DESIGN"}</h3>
            </div>
            <div className="box-title3">
              <Link className='button' to="/shop">SHOP NOW</Link>
            </div>
          </div>
        </div>
      ))}
    </Slide>
  );
};

export default Slideshow;
