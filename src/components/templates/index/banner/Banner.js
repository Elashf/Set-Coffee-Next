"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function Banner() {
  return (
    <Swiper
      rewind={true}
      loop={true}
      autoplay={{ delay: 2500 }}
      navigation={true}
      modules={[Navigation, Autoplay]}
      className="mySwiper home-slideer"
    >
      <SwiperSlide>
        <img src="/images/1.jpg" alt="slide" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="/images/2.jpg" alt="slide" />
      </SwiperSlide>
     
    </Swiper>
  );
}

export default Banner;
