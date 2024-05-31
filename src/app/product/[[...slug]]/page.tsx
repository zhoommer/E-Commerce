"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { ProductTypes } from "@/types/product-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { BsBox, BsChat, BsGift, BsHeart, BsPhone } from "react-icons/bs";
import { TbArrowCurveLeft } from "react-icons/tb";
import { useAppDispatch } from "@/app/redux/store";
import Swal from "sweetalert2";
import { addToCart } from "@/app/redux/features/add-to-cart/addToCartSlice";
import { increment } from "@/app/redux/features/counter/counterSlice";
import Image from "next/image";
import { GiHanger } from "react-icons/gi";
import { Rating } from "@mui/material";

export interface CartItemTypes {
  brand: string;
  title: string;
  price: string;
  size: string;
  image: string;
  amount: number | null;
}

const ProductDetail = ({ params }: { params: { slug: string[] } }) => {
  const [data, setData] = useState<ProductTypes[]>([]);
  const searchParams = useSearchParams();
  const [size, setSize] = useState<string>("S");

  const dispatch = useAppDispatch();

  const addToCartFunct = () => {
    dispatch(increment());
    dispatch(
      addToCart({
        boutiqueId: data[0].boutiqueId,
        merchantId: data[0].merchantId,
        brand: data[0]?.brand,
        title: data[0]?.title,
        price: data[0]?.price,
        size: size,
        image: data[0]?.image,
        amount: 1,
      }),
    );
    Swal.fire({
      icon: "success",
      position: "top-right",
      title: "Urun sepete eklendi",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ProductTypes[]>(
          `http://localhost:3000/products`,
        );
        const boutiqueId = searchParams?.get("boutiqueId");
        const merchantId = searchParams?.get("merchantId");

        const filterData = response.data.filter(
          (item) =>
            item.boutiqueId === boutiqueId && item.merchantId === merchantId,
        );
        setData(filterData);
      } catch (error) {
        console.log(error);
      }
    };

    //fetchProduct();
  }, []);

  return (
    <div className="grid grid-cols-[3fr_6fr_3fr] gap-10">
      <div className="border rounded">
        <Swiper>
          <SwiperSlide>
            <Image
              src={`/images/products/${data[0]?.image}`}
              alt={data[0]?.brand}
              width={402}
              height={602}
              className="rounded"
            />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="p-3">
        <div className="header flex items-center">
          <h3 className="font-bold text-lg">{data[0]?.brand}</h3>
          <span className="ms-3">{data[0]?.title}</span>
        </div>

        <div className="rating flex text-xs font-light mt-2 gap-10">
          <p className="flex items-center text-md">
            {data[0]?.rating}
            <span>
              <Rating
                name="half-rating"
                value={data[0]?.rating ? data[0]?.rating : null}
                precision={0.5}
                size="small"
                readOnly
              />
            </span>
          </p>
          <p className="flex items-center">
            <span className="font-medium">1318</span>
            <span className="ms-1">Degerlendirme</span>
            <span className="ms-1">
              <BsPhone />
            </span>
          </p>
          <p>
            <span className="font-medium">602</span> Soru & Cevap
          </p>
          <p className="flex items-center">
            <span>
              <BsHeart />
            </span>
            <span className="font-medium ms-1">167244</span>
            <span className="ms-1">Favori</span>
          </p>
        </div>

        <div
          className="featured-price border border-red-700 rounded mt-5 flex flex-col justify-center items-center"
          style={{ width: "240px" }}
        >
          <span className="text-xs text-red-700 font-medium flex items-center bg-red-100 rounded p-1 mt-2">
            <TbArrowCurveLeft className="rotate-180 me-1" /> Son 14 gunun en
            dusuk fiyati!
          </span>
          <p className="font-bold text-red-700">{data[0]?.price}</p>
        </div>

        <hr className="mt-5" />

        <div className="p-size mt-3">
          <select
            className="bg-transparent border rounded p-2"
            style={{ width: "100%" }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSize(e.target.value)
            }
          >
            {data[0]?.size?.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="add-to-cart flex items-center mt-4">
          <button
            className=" rounded p-2 bg-purple-400 text-white hover:bg-purple-900"
            style={{ width: "90%" }}
            onClick={addToCartFunct}
          >
            Sepete Ekle
          </button>
          <span className="border rounded-full p-3 ms-3 cursor-pointer">
            <BsHeart className="hover:text-purple-800 font-medium text-lg" />
          </span>
        </div>

        <div className="font-light inline-flex items-center mt-3">
          <span className="me-2">
            <GiHanger className="text-purple-800" size={25} />
          </span>
          Kullanicilarin cogu kendi bedeninizi almanizi oneriyor.
        </div>

        <div className="flex items-center text-xs bg-gray-100 rounded p-2 mt-5">
          <BsBox />
          <span className="font-medium ms-2">Tahmini Kargoya Teslim :</span>
          <span className="ms-1">2 gun icinde</span>
        </div>
      </div>
      <div className="">
        <h4 className="text-xs text-gray-500 font-medium">
          URUNUN KAMPANYALARI
        </h4>
        <div className="border rounded mt-2 flex items-center text-sm p-2 cursor-pointer">
          <BsBox className="me-2" />
          200 TL ve Uzeri Kargo Bedava
        </div>

        <div className="border rounded mt-4 p-2 text-xs relative cursor-pointer">
          <div className="bg-blue-300 rounded p-2 text-blue-700">
            New & Shine
            <span className="bg-green-700 text-white rounded px-2 text-xs ms-2">
              9.4
            </span>
          </div>
          <div className="flex items-center mt-2">
            <div className="p-2 bg-gray-300 rounded">
              <BsGift />
            </div>
            <span className="ms-2">Takip Et</span>
          </div>
          <div className="flex items-center mt-2 mb-3">
            <div className="p-2 bg-gray-300 rounded">
              <BsChat />
            </div>
            <span className="ms-2">Satici Sorulari</span>
          </div>
          <button className="bg-gray-200 rounded p-2 absolute -bottom-4 left-32">
            MAGAZAYA GIT ➡️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
