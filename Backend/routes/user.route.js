const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  Logout,
  forgotPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../controller/user.controller");

const { isAuthenticatedUser } = require("../middleware/auth");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(Logout);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/me").get(isAuthenticatedUser, getUserDetails);
userRouter.route("/me/update").put(isAuthenticatedUser, updateProfile);
userRouter.route("/password/update").put(isAuthenticatedUser, updatePassword);

module.exports = userRouter;
