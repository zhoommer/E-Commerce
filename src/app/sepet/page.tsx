"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { removeToCart } from "../redux/features/add-to-cart/addToCartSlice";
import { BsBox, BsCart, BsPerson, BsTrash3 } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Swal from "sweetalert2";
import { Checkbox, IconButton } from "@mui/material";
import { QuantityInput } from "@/components/number-input/NumberInput";

const CartDetail = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.addToCartSlice);
  const prices: number[] = cartItems.map(
    (item) => parseFloat(item.price) * item.amount,
  );
  const total: number = prices.reduce((acc, curr) => acc + curr, 0);

  const removeToCartFunc = (merchantId: string) => {
    dispatch(removeToCart(merchantId));
    Swal.fire({
      position: "top-right",
      icon: "info",
      title: "Urun basarili bir sekilde kaldirildi.",
      showConfirmButton: false,
      timer: 3000,
    });
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="grid grid-cols-2 border rounded shadow p-3">
          <p className="font-bold inline-flex items-center">
            <BsCart
              className="me-3 border rounded-full p-3 bg-purple-300 text-purple-900"
              size={60}
            />
            Sepetinizde urun bulunmamaktadir.
          </p>
          <button
            className="bg-purple-500 p-3 text-white rounded w-9/12 mx-auto"
            onClick={() => router.push("/")}
          >
            Alisverise Basla
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-[9fr_3fr] gap-10 p-3">
          <div>
            <p className="text-xl font-bold">Sepetim ({cartItems.length})</p>

            <div className="flex items-center bg-purple-100 p-3 rounded mt-3 shadow">
              <BsPerson size={40} />
              <span className="text-lg ms-2">
                Alisverisini daha hizli tamamlamak icin
                <a href="#" className="text-purple-800 underline ms-2">
                  Giris Yap
                </a>
              </span>
            </div>

            <div className="border rounded shadow mt-5">
              <div className="p-3">
                <span className="font-light">
                  Satici: {cartItems[0]?.brand}
                </span>
              </div>

              <div className="bg-purple-100 flex justify-center items-center p-3 rounded">
                <span>
                  <BsBox className="text-purple-900" />
                </span>
                {total > 200 && (
                  <span className="ms-2 font-medium">Kargo Bedava!</span>
                )}
              </div>
              {cartItems?.map((item, index) => (
                <div
                  className="grid grid-cols-[1fr_6fr_2fr_2fr] p-3"
                  key={index}
                >
                  <div className="flex items-center">
                    <Checkbox color="secondary" size="small" />
                  </div>
                  <div className="flex">
                    <div className="me-3">
                      <Image
                        src={`/images/products/${item.image}`}
                        alt={item.brand}
                        width={100}
                        height={160}
                        className="border rounded"
                      />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {item.brand}
                        <span className="font-normal ms-2">{item.title}</span>
                      </p>

                      <p>Beden: {item.size}</p>
                      <p className="text-sm">
                        Tahmini Kargoya Teslim: 2 gun icinde
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center">
                    <QuantityInput item={item} />
                  </div>
                  <div className="flex flex-col justify-evenly items-end">
                    <IconButton
                      color="secondary"
                      title="Sil"
                      size="small"
                      onClick={() => removeToCartFunc(item.merchantId)}
                    >
                      <BsTrash3 />
                    </IconButton>
                    <p className="text-purple-800 font-bold">{item.price}TL</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-100" style={{ width: "100%" }}>
            <div className="text-center">
              <button
                className="bg-purple-400 text-white p-4 rounded hover:bg-purple-300"
                style={{ width: "100%" }}
              >
                Sepeti Onayla
              </button>
            </div>
            <div className="border rounded mt-5 p-4 shadow">
              <p className="text-xl">Siparis Ozeti</p>
              <div className="mt-5 grid grid-cols-2">
                <p>Urunun Toplami</p>
                <p className="flex justify-end">{total} TL</p>
              </div>
              <div className="grid grid-cols-2">
                <p>Kargo Toplam</p>
                <p className="flex justify-end">34.99 TL</p>
              </div>
              {total > 200 && (
                <div className="grid grid-cols-[8fr_4fr]">
                  <div className="">
                    <p>200 TL ve Uzeri Kargo</p>
                    <p>Bedava (Satici Karsilar)</p>
                  </div>
                  <p className="flex justify-end">- 34.99 TL</p>
                </div>
              )}

              <hr className="mt-3" />

              <div className="mt-3 grid grid-cols-2">
                <p>Toplam</p>
                <p className="flex justify-end">
                  {total < 200 ? total + 34.99 : total} TL
                </p>
              </div>
            </div>
            <div className="text-center mt-5">
              <button
                className="bg-purple-400 text-white p-4 rounded hover:bg-purple-300"
                style={{ width: "100%" }}
              >
                Sepeti Onayla
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartDetail;
