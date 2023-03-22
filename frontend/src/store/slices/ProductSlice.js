import { createSlice } from "@reduxjs/toolkit";
import { clearErrors } from "../manulActions";

const ProductSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productsCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.productsCount = action.payload.length;
    },
    fetchProductsFailure: (state, action) => {
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
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} = ProductSlice.actions;

export const productReducer = ProductSlice.reducer;
