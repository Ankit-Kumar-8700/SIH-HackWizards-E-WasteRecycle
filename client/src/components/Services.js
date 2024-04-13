import * as React from 'react';

import { EffectCoverflow, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Card from "./Card";

import {servicesSlider} from "../constants/index";

export default function Service() {
  return (
    <section className="pt-[7rem] pb-[2rem] bg-lightBg">
      <div className="lg:mx-auto max-w-5xl mx-[1.5rem]">
        <h1 className="text-[3rem] font-bold  mb-[2rem] text-center text-darkGreen">
        Our Services
        </h1>
        <Swiper
          modules={[EffectCoverflow, Pagination]}
          effect={'coverflow'}
          loop={true}
          spaceBetween={30}
          slidesPerView={3}
          pagination={{
            clickable: true,
          }}
          centeredSlides={true}
          grabCursor={true}
          coverflowEffect={{
            rotate: 0,
            slideShadows: false,
          }}
          className="coverflow"
        >
          {servicesSlider.map((slide,index) => {
            return (
              <SwiperSlide key={index}>
                <Card {...slide}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </section>
  );
}
