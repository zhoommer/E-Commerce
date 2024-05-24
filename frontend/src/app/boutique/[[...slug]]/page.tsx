"use client";
import React, { useState, useEffect } from "react";
import PopularProducts from "@/pages/popular-products/popularProducts";
import BestSellingProducts from "@/pages/best-selling-products/bestSellingProducts";
import AdvantageousProducts from "@/pages/advantageous-products/advantageousProducts";
import Box from "@/components/box/box";
import { boxes, boxes2, boxes3 } from "@/boxes-data/boxes-data";
import { ProductTypes } from "@/types/product-types";
import axios from "axios";

const Boutique = ({ params }: { params: { slug: string[] } }) => {
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
  if (parseInt(params.slug[1]) === 1) {
    return (
      <div>
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
        </div>{" "}
      </div>
    );
  } else if (parseInt(params.slug[1]) === 2) {
    return (
      <div>
        <p>Viewing Boutique for Men</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 3) {
    return (
      <div>
        <p>Viewing Boutique for Mom & Kid</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 4) {
    return (
      <div>
        <p>Viewing Boutique for Home & Life</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 5) {
    return (
      <div>
        <p>Viewing Boutique for Supermarket</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 6) {
    return (
      <div>
        <p>Viewing Boutique for Cosmetic</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 7) {
    return (
      <div>
        <p>Viewing Boutique for Shoes & Bag</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 8) {
    return (
      <div>
        <p>Viewing Boutique for Electronic</p>
      </div>
    );
  } else if (parseInt(params.slug[1]) === 9) {
    return (
      <div>
        <p>Viewing Boutique for Best Seller</p>
      </div>
    );
  }
  return <div>Default page</div>;
};

export default Boutique;
