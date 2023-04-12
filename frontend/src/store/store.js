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

import {
  loginRequest,
  loginSuccess,
  loginFail,
  userReducer,
  registerFail,
  registerRequest,
  registerSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFail,
} from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    productDetail: productDetailReducer,
    user: userReducer,
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
  loginRequest,
  loginSuccess,
  loginFail,
  registerFail,
  registerRequest,
  registerSuccess,
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  logoutSuccess,
  logoutFail,
  clearErrors,
};
