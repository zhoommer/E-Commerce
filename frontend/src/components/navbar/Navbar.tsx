"use client";
import React, { useState } from "react";
import { BsPerson, BsHeart, BsSearch, BsCart } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { useRouter } from "next/navigation";
import NavbarLinks from "./Links";
import SearchResults from "./SearchResults";

const Navbar = () => {
  const count = useSelector((state: RootState) => state.addToCartSlice.length);
  const router = useRouter();

  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col border rounded container m-auto shadow bg-gray-50">
        <div className="flex justify-around p-3" style={{ width: "100%" }}>
          <div className="w-1/3">
            <Link href={"/"} className="text-4xl ms-2 mt-2 ">
              friendyol
            </Link>
          </div>
          <div className="w-2/3 inline-flex items-center relative ">
            <input
              id="navbar-search-input"
              type="search"
              placeholder="Aradiginiz urun, kategori veya markayi yaziniz"
              className="bg-purple-100 rounded p-2 text-sm"
              style={{ width: "100%" }}
              onClick={() => {
                setShowSearchResult(!showSearchResult);
              }}
            />
            <BsSearch className="absolute right-3 text-purple-500" />

            <div
              id="search-result"
              className="absolute rounded bg-purple-100 p-5 search-result-container"
              style={{
                width: "100%",
                maxHeight: "30em",
                minHeight: "30em",
                zIndex: "9999",
                bottom: "-30em",
                display: showSearchResult ? "block" : "none",
              }}
            >
              <SearchResults />
            </div>
          </div>
          <div className="w-1/3 flex justify-evenly items-center">
            <button className="inline-flex hover:text-purple-500 hover:font-semibold">
              <BsPerson />
              <span className="text-xs ms-2">Giris</span>
            </button>
            <button className="inline-flex hover:text-purple-500 hover:font-semibold">
              <BsHeart />
              <span className="text-xs ms-2">Favoriler</span>
            </button>
            <button
              className="inline-flex relative hover:text-purple-500 hover:font-semibold"
              onClick={() => router.push("/sepet")}
            >
              <span className="absolute -top-2 -left-2 text-white text-xs bg-purple-800 rounded-full w-4 h-4">
                {count}
              </span>
              <BsCart />
              <span className="text-xs ms-2">Sepet</span>
            </button>
          </div>
        </div>

        <NavbarLinks />
      </div>
    </>
  );
};

export default Navbar;
