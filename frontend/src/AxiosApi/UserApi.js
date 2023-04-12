import {
  loginSuccess,
  loginFail,
  loginRequest,
  registerRequest,
  registerSuccess,
  registerFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutFail,
  logoutSuccess,
  clearErrors,
} from "../store/store";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/v1/login",
      { email, password },
      config
    );

    dispatch(loginSuccess(data));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      loginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/api/v1/register", userData, config);

    dispatch(registerSuccess(data.user));
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch(
      registerFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axios.get("/api/v1/me");

    dispatch(loadUserSuccess(data.user));
  } catch (error) {
    dispatch(
      loadUserFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");
    localStorage.removeItem("userInfo");

    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(
      logoutFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    );
  }
};
export const clearError = () => (dispatch) => {
  dispatch(clearErrors());
};
