const express = require("express");
const userRouter = express.Router();
const {
  registerUser,
  loginUser,
  Logout,
  forgotPassword,
} = require("../controller/user.controller");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(Logout);
userRouter.route("/password/forgot").post(forgotPassword);

module.exports = userRouter;
