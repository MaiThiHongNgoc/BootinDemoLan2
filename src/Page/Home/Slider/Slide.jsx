import React, { useEffect, useRef,useState } from 'react';
import Slider from 'react-slick';
import './Slide.css'; // Include the necessary CSS
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const images = [
    "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider3-2.jpg",
    "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider3-3.jpg",
    "https://raw.githubusercontent.com/supahfunk/supah-codepen/master/canyon-4.jpg",
    "https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/05/slider3-1.jpg"
  ];
  
  const textItems = ["Canyon", "Desert", "Erosion", "Shape"];
  
  const Slideshow = () => {
    const mainSlider = useRef(null);
    const rightSlider = useRef(null);
    const textSlider = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);
  
    const settingsMain = {
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      infinite: true,
      dots: false,
      speed: 1000,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      beforeChange: (currentSlide, nextSlide) => {
        setCurrentSlide(nextSlide);
        if (currentSlide > nextSlide && nextSlide === 0 && currentSlide === images.length - 1) {
          rightSlider.current.slickGoTo(-1);
          textSlider.current.slickGoTo(images.length);
        } else if (currentSlide < nextSlide && currentSlide === 0 && nextSlide === images.length - 1) {
          rightSlider.current.slickGoTo(images.length);
          textSlider.current.slickGoTo(-1);
        } else {
          rightSlider.current.slickGoTo(images.length - 1 - nextSlide);
          textSlider.current.slickGoTo(nextSlide);
        }
      },
    };
  
    const settingsRight = {
      vertical: true,
      arrows: false,
      infinite: true,
      speed: 950,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      initialSlide: images.length - 1,
      swipe: false,
    };
  
    const settingsText = {
      vertical: true,
      arrows: false,
      infinite: true,
      speed: 900,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
      swipe: false,
    };
  
    useEffect(() => {
      const interval = setInterval(() => {
        mainSlider.current.slickNext();
      }, 5000);
  
      return () => clearInterval(interval);
    }, []);
  
    const handleControlClick = (index) => {
      setCurrentSlide(index);
      mainSlider.current.slickGoTo(index);
    };
  
    return (
      <div>
        <div className="split-slideshow">
          <div className="slideshow slideshow-left">
            <Slider ref={mainSlider} {...settingsMain} className="slider">
              {images.map((image, index) => (
                <div className="item" key={index}>
                  <img src={image} alt={`Slide ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="slideshow slideshow-right">
            <Slider ref={rightSlider} {...settingsRight} className="slider">
              {images.slice().reverse().map((image, index) => (
                <div className="item" key={index}>
                  <img src={image} alt={`Slide ${images.length - index}`} />
                </div>
              ))}
            </Slider>
          </div>
          <div className="slideshow-text">
            <Slider ref={textSlider} {...settingsText}>
              {textItems.map((text, index) => (
                <div className="item" key={index}>{text}</div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="control-dots">
          {images.map((image, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleControlClick(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Slideshow;