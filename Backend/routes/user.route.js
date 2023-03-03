const express = require("express");
const userRouter = express.Router();
const { registerUser } = require("../controller/user.controller");

userRouter.route("/register").post(registerUser);

module.exports = userRouter;
