import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import {
  productReducer,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  ClearError,
} from "./slices/ProductSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
  middleware: [thunk],
});

export {
  store,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  ClearError,
};
