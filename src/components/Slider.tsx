"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Children, FC, ReactNode } from "react";

type ProspType = {
  children: ReactNode;
};

const Slider: FC<ProspType> = ({ children }) => {
  return (
    <Swiper slidesPerView={1} loop navigation>
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
