"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { usePathname } from "next/navigation";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { SwiperImages } from "./images";

const SwiperComponent = () => {
  const pathname = usePathname();
  return (
    <div
      className="shadow-md p-4 rounded"
      style={{ display: pathname === "/" ? "block" : "none" }}
    >
      <Swiper
        slidesPerView={9}
        effect="slide"
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Pagination, Navigation]}
      >
        {SwiperImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.src}
              alt={image.name}
              className="border rounded-full cursor-pointer shadow-sm"
              width={79}
              height={79}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperComponent;
