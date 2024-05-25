"use client";
import React from "react";
import { usePathname } from "next/navigation";

const FeaturedProducts = () => {
  const pathname = usePathname();
  return (
    <div
      className="relative top-36 flex justify-center container m-auto"
      style={{ display: pathname === "/" ? "block" : "none" }}
    >
      <button
        className="bg-green-100 text-green-600 font-bold p-3 rounded"
        style={{ width: "29em" }}
      >
        Sepete En Cok Eklenenler
      </button>
      <button
        className="bg-orange-100 text-orange-900 font-bold p-3 rounded ms-4"
        style={{ width: "29em" }}
      >
        En Cok One Cikanlar
      </button>
      <button
        className="bg-pink-100 text-pink-600 font-bold p-3 rounded ms-4"
        style={{ width: "29em" }}
      >
        Flas Urunler
      </button>
    </div>
  );
};

export default FeaturedProducts;
