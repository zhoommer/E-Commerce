"use client";

import { useEffect, useState } from "react";
import { ProductTypes } from "@/types/product-types";

import axios from "axios";
import Box from "@/components/box/box";

import { boxes, boxes2, boxes3 } from "@/boxes-data/boxes-data";
import PopularProducts from "@/pages/popular-products/popularProducts";
import BestSellingProducts from "@/pages/best-selling-products/bestSellingProducts";
import AdvantageousProducts from "@/pages/advantageous-products/advantageousProducts";

export default function Home() {
  const [popularProducts, setPopularProducts] = useState<ProductTypes[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<
    ProductTypes[]
  >([]);
  const [advantageProducts, setAdvantageProducts] = useState<ProductTypes[]>(
    [],
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<ProductTypes[]>(
        "http://localhost:3000/products",
      );
      const popularProd = response.data.filter(
        (item) => item.pageCategory === "popular-products",
      );
      const bestSellingProd = response.data.filter(
        (item) => item.pageCategory === "best-selling",
      );
      const advantageProd = response.data.filter(
        (item) => item.pageCategory === "advantageous-products",
      );
      setPopularProducts(popularProd);
      setBestSellingProducts(bestSellingProd);
      setAdvantageProducts(advantageProd);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <PopularProducts data={popularProducts} />

      <div className="mt-9 flex gap-44">
        {boxes.map((item, index) => (
          <Box key={index} box={item} />
        ))}
      </div>

      <BestSellingProducts bestSellingProducts={bestSellingProducts} />

      <div className="mt-9 flex gap-44">
        {boxes2.map((item, index) => (
          <Box key={index} box={item} />
        ))}
      </div>

      <AdvantageousProducts advantageProducts={advantageProducts} />

      <div className="mt-9 grid grid-cols-3 " style={{ columnGap: "7em" }}>
        {boxes3.map((item, index) => (
          <Box key={index} box={item} />
        ))}
      </div>
    </main>
  );
}
