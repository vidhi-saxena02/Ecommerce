import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../store/slices/ProductSlice";
import axios from "axios";

import { clearErrors } from "../store/manulActions";

import {
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFail,
} from "../store/slices/ProductDetailSlice";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());
    const { data } = await axios.get("http://localhost:4000/api/v1/products");
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const clearError = () => (dispatch) => {
  dispatch(clearErrors());
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(getProductDetailRequest());
    const { data } = await axios.get(
      `http://localhost:4000/api/v1/products/${id}`
    );

    dispatch(getProductDetailSuccess(data));
  } catch (error) {
    dispatch(getProductDetailFail(error.message));
  }
};
