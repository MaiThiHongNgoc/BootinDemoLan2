import React, { useState, useEffect } from 'react';
import './Slide.css';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const Slideshow = () => {
  const [items] = useState([
    {
      title: 'collection book 2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      image: 'https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider5-1.jpg',
    },
    {
      title: 'collection book 2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      image: 'https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider2-3.jpg',
    },
    {
      title: 'collection book 2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      image: 'https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider1-1.jpg',
    },
    {
      title: 'collection book 2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      image: 'https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider3-2.jpg',
    },
    {
      title: 'collection book 2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      image: 'https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider3-3.jpg',
    },
    {
      title: 'collection book 2024',
      description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore fuga voluptatum, iure corporis inventore praesentium nisi. Id laboriosam ipsam enim.',
      image: 'https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider3-1.jpg',
    },
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionClass, setTransitionClass] = useState('checkerboard');

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setTransitionClass(getRandomTransitionClass());
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handlePrev = () => {
    setTransitionClass(getRandomTransitionClass());
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  const getRandomTransitionClass = () => {
    const classes = ['checkerboard', 'slide-left', 'slide-right', 'zoom-in', 'zoom-out'];
    return classes[Math.floor(Math.random() * classes.length)];
  };

  return (
    <div className='slide_1'>
      <ul className="slider">
        {items.map((item, index) => (
          <li
            key={index}
            className={`item ${index === currentIndex ? `active ${transitionClass}` : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="content-slide">
              <h2 className="title">{item.title}</h2>
              <p className="description">{item.description}</p>
              <button>Read More</button>
            </div>
          </li>
        ))}
      </ul>
      {/* <div className="nav">
        <FaArrowCircleLeft className="btn prev" onClick={handlePrev} />
        <FaArrowCircleRight className="btn next" onClick={handleNext} />
      </div> */}
    </div>
  );
};

export default Slideshow;