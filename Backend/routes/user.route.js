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
  getAllUsers,
  getSingleUser,
  updateRole,
  deleteUser,
} = require("../controller/user.controller");

const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(Logout);
userRouter.route("/password/forgot").post(forgotPassword);
userRouter.route("/me").get(isAuthenticatedUser, getUserDetails);
userRouter.route("/me/update").put(isAuthenticatedUser, updateProfile);
userRouter.route("/password/update").put(isAuthenticatedUser, updatePassword);
userRouter
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRole("admin"), getAllUsers);
userRouter
  .route("/admin/users/:id")
  .get(isAuthenticatedUser, authorizeRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRole("admin"), updateRole)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteUser);

module.exports = userRouter;
