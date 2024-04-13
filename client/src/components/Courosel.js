import React, { useEffect } from 'react';
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

const Carousel = () => {
  useEffect(() => {
    // Initialize Swiper
    const mySwiper = new Swiper('.swiper-container', {
      loop: true, // Enable continuous loop
      autoplay: {
        delay: 3000, // Set the interval to 3 seconds (3000 milliseconds)
      },
    });

    // Cleanup Swiper on unmount
    return () => {
      mySwiper.destroy();
    };
  }, []);

  return (
    <div className="w-full">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Slide 1"
              className="w-full h-96"
            />
          </div>
          <div className="swiper-slide">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Slide 2"
              className="w-full h-96"
            />
          </div>
          <div className="swiper-slide">
            <img
              src="https://via.placeholder.com/800x400"
              alt="Slide 3"
              className="w-full h-96"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
