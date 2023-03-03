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
  .route("/products/new")
  .post(isAuthenticatedUser, authorizeRole("admin"), createProduct);
productRouter
  .route("/products/:id")
  .put(isAuthenticatedUser, authorizeRole("admin"), updateProducts);
productRouter
  .route("/products/:id")
  .delete(isAuthenticatedUser, authorizeRole("admin"), deleteProducts)
  .get(getProductDetails);

module.exports = productRouter;
