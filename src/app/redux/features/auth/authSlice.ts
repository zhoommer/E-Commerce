import axiosClient from "@/axiosClient/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserType {
  name: string;
  surname: string;
}

interface InitialStateType {
  loading: boolean;
  error: string | undefined;
  access_token: string | null;
  refresh_token: string | null;
  user: UserType | null;
}

interface PostData {
  email: string;
  passwordHash: string;
}

const initialState: InitialStateType = {
  loading: false,
  error: "",
  access_token: "",
  refresh_token: "",
  user: {
    name: "",
    surname: "",
  },
};

export const loginFunc = createAsyncThunk(
  "loginFunc",
  async (postData: PostData) => {
    const client = axiosClient();
    const response = await client.post<InitialStateType>(
      "auth/signin",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginFunc.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(loginFunc.fulfilled, (state, action: any) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.user = action.payload.user;
      state.loading = false;
    });

    builder.addCase(loginFunc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.user = null;
    });
  },
});

export default authSlice.reducer;
