import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  ClearError,
} from "../store/slices/ProductSlice";
import axios from "axios";

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
  dispatch(ClearError());
};
