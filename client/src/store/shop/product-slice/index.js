import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  productList: [],
  productDetails: null,
};

export const fectchAllFilterdProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`
    );

    return response?.data;
  }
);

export const fectchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`
    );

    return response?.data;
  }
);

const shopProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fectchAllFilterdProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fectchAllFilterdProducts.fulfilled, (state, action) => {
        console.log(action.payload, "action.payload");

        state.isLoading = true;
        state.productList = action.payload.data;
      })
      .addCase(fectchAllFilterdProducts.rejected, (state) => {
        state.productList = [];
      })
      .addCase(fectchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fectchProductDetails.fulfilled, (state, action) => {
        state.isLoading = true;
        state.productDetails = action.payload.data;
      })
      .addCase(fectchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const {setProductDetails} = shopProductSlice.actions;

export default shopProductSlice.reducer;
