import { ProductTypes } from "@/types/product-types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const SearchResults = () => {
  const [data, setData] = useState<ProductTypes[]>([]);

  

  return (
    <div>
      <p className="font-medium">Gecmis Aramalar</p>
      <div className="grid grid-cols-4 gap-2 mt-2">
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Kareli gomlek
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Corap
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Monitor
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Klavye
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Gaming Mouse
        </button>
      </div>
      <p className="font-medium mt-3">Populer Aramalar</p>
      <div className="grid grid-cols-4 gap-2 mt-2">
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          T-shirt
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Avize
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Yelek
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Trenckot
        </button>
        <button className="border rounded bg-white p-2 text-xs hover:border-purple-800 hover:text-purple-800">
          Boyner
        </button>
      </div>
      <p className="font-medium mt-3">Populer Urunler</p>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
      >
        {data.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="flex border border-purple-900 rounded p-2">
              <Image
                src={`/images/products/${product.image}`}
                alt="image"
                width={100}
                height={100}
              />
              <div className="grid grid-rows-2 items-start text-start">
                <p className="text-sm ms-3">
                  {product.brand}{" "}
                  <span className="font-light text-sm">{product.title}</span>
                </p>
                <p className="ms-4 text-purple-800">{product.price}TL</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SearchResults;
