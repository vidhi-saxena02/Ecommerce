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

export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch(fetchProductsStart());

      let link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await axios.get(link);
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
