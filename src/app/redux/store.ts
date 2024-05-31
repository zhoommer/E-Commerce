"use client";

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import counterSlice from "./features/counter/counterSlice";
import addToCartSlice from "./features/add-to-cart/addToCartSlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    counterSlice,
    addToCartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
