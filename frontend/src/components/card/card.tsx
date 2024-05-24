"use client";
import React from "react";
import { BsHeart, BsTruck, BsBox } from "react-icons/bs";
import { ProductTypes } from "@/types/product-types";
import { useRouter } from "next/navigation";
import { Rating } from "@mui/material";

interface CardProps {
  product: ProductTypes;
  category: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ product, category, index }) => {
  const router = useRouter();
  return (
    <div className="cursor-pointer">
      <div
        className="border rounded-lg flex flex-col items-start relative mt-4 shadow bg-white"
        style={{ maxWidth: "220px", minHeight: "440px", maxHeight: "440px" }}
        onClick={() => router.push(product.slug)}
      >
        {product.fastDelivery && (
          <div className="inline-flex items-center w-max bg-green-500 rounded absolute left-2 top-3 px-1">
            💨
            <BsTruck className="ms-1 text-white" />
            <div className="flex flex-col ms-1">
              <span
                className="text-white font-bold"
                style={{ fontSize: "7px" }}
              >
                HIZLI
              </span>
              <span
                className="text-white font-bold"
                style={{ fontSize: "7px" }}
              >
                KARGO
              </span>
            </div>
          </div>
        )}
        {product.freeCargo && (
          <div
            className="bg-gray-500 text-white absolute left-2 top-12 rounded py-1 inline-flex items-center px-1"
            style={{ fontSize: "12px" }}
          >
            <BsBox /> <span className="ms-1">Ucretsiz Kargo</span>
          </div>
        )}
        <span className="absolute top-3 right-2 bg-white border rounded-full p-2 hover:text-purple-800">
          <BsHeart />
        </span>
        <img
          src={
            require(`@/assets/images/${category}/1_org_zoom${index}.webp`)
              .default.src
          }
          alt={product.brand}
          className="px-5"
        />
        <div
          className="bg-purple-200 w-full text-center text-white font-bold p-1"
          style={{ fontSize: "10px" }}
        >
          🥇 1st Best Selling Product
        </div>
        <div className="text-xs ms-3 mt-2 text-start text-ellipsis overflow-hidden...">
          <b>{product.brand}</b>
          <span className="ms-2">{product.title}</span>
        </div>
        <p className="font-light text-xs mt-2 ms-3 inline-flex items-center">
          {product.rating}
          <span>
            <Rating
              value={product.rating ? product.rating : null}
              precision={0.5}
              size="small"
            />
          </span>
        </p>
        <p className="text-purple-700 mt-5 ms-3 mb-2">{product.price} TL</p>
        {product.label && (
          <div
            className="font-medium bg-purple-100 w-max p-1 rounded ms-3 mb-3"
            style={{ fontSize: "10px" }}
          >
            🏷️{product.label}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
