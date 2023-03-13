const express = require("express");
const OrderRoute = express.Router();
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/order.controller");

OrderRoute.route("/order/new").post(isAuthenticatedUser, newOrder);
OrderRoute.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
OrderRoute.route("/orders/me").get(isAuthenticatedUser, myOrders);
OrderRoute.route("/admin/orders").get(
  isAuthenticatedUser,
  authorizeRole("admin"),
  getAllOrders
);
OrderRoute.route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateOrder)
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteOrder);

module.exports = OrderRoute;
