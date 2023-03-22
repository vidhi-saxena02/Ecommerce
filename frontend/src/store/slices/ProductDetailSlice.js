import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../manulActions";

const ProductDetailSlice = createSlice({
  name: "productDetail",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    getProductDetailRequest: (state) => {
      state.loading = true;
    },
    getProductDetailSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    getProductDetailFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(clearErrors, (state) => {
      state.error = null;
    });
  },
});

export const {
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
} = ProductDetailSlice.actions;

export const productDetailReducer = ProductDetailSlice.reducer;
