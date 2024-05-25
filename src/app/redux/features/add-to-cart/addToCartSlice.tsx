import { createSlice } from "@reduxjs/toolkit";

export interface CartItemTypes {
  boutiqueId: string;
  merchantId: string;
  brand: string;
  title: string;
  price: string;
  size: string;
  image: string;
  amount: number;
}
const initialState: CartItemTypes[] = [];

export const addToCartSlice = createSlice({
  name: "addToCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    removeToCart: (state, action) => {
      const filteredCart = state.filter(
        (item) => item.merchantId !== action.payload,
      );
      return filteredCart;
    },
    updateAmount: (state, action) => {
      const updatedState = state.find(
        (item) => item.merchantId === action.payload.id,
      );
      if (updatedState) {
        updatedState.amount = action.payload.amount;
      }
    },
  },
});

export const { addToCart, removeToCart, updateAmount } = addToCartSlice.actions;
export default addToCartSlice.reducer;
