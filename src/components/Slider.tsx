"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Children, FC, ReactNode } from "react";
import "swiper/react";

type ProspType = {
  children: ReactNode;
};

const Slider: FC<ProspType> = ({ children }) => {
  return (
    <Swiper slidesPerView={1} loop navigation modules={[Navigation]}>
      {Children.map(children, (child) => (
        <SwiperSlide>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
