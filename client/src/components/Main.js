import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import slider1 from "../img/slider1.jpg";
import slider2 from "../img/slider2.jpeg";
import slider3 from "../img/slider3.jpeg";


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import {Autoplay,Navigation} from 'swiper/modules';

export default function Main() {
  return (
    <div className='first'>
      <Swiper 
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              modules={[Autoplay, Navigation]} className="mySwiper">
        <SwiperSlide><img className="h-screen object-cover w-full" src={slider1} alt="dhale"></img></SwiperSlide>
        <SwiperSlide><img className="h-screen object-cover w-full" src={slider2} alt="dhale"></img></SwiperSlide>
        <SwiperSlide><img className="h-screen object-cover w-full" src={slider3} alt="dhale"></img></SwiperSlide>
      </Swiper>
    <div/>
    </div>
  );
}
