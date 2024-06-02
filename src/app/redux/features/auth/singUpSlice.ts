import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "@/axiosClient/axiosClient";
import { PostData } from "./authSlice";

interface InitialStateType {
  loading: boolean;
  error: string | undefined;
  access_token: string;
  refresh_token: string;
}

const initialState: InitialStateType = {
  loading: false,
  error: "",
  access_token: "",
  refresh_token: "",
};

export const registerFunc = createAsyncThunk(
  "registerFunc",
  async (postData: PostData) => {
    const client = axiosClient();
    const response = await client.post<InitialStateType>(
      "auth/signup",
      postData,
    );

    return response.data;
  },
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerFunc.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(registerFunc.fulfilled, (state, action: any) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.loading = false;
    });

    builder.addCase(registerFunc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default signupSlice.reducer;
