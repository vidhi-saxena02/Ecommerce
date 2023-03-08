const {
  createProduct,
  getAllProducts,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controller/product.controller");

const express = require("express");
const { isAuthenticatedUser, authorizeRole } = require("../middleware/auth");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
productRouter
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProducts);
productRouter
  .route("/admin/products/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProducts);

productRouter.route("/products/:id").get(getProductDetails);

module.exports = productRouter;
