const express = require("express");
const userRouter = express.Router();
const { registerUser, loginUser } = require("../controller/user.controller");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);

module.exports = userRouter;
