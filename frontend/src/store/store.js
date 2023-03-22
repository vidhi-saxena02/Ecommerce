import { configureStore } from "@reduxjs/toolkit";
import { clearErrors } from "./manulActions";
import thunk from "redux-thunk";
import {
  productReducer,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "./slices/ProductSlice";

import {
  productDetailReducer,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
} from "./slices/ProductDetailSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
  },
  middleware: [thunk],
});

export {
  store,
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
  clearErrors,
};
