const {
  createProduct,
  getAllProducts,
  updateProducts,
  deleteProducts,
  getProductDetails,
} = require("../controller/product.controller");

const express = require("express");
const { isAuthenticatedUser } = require("../middleware/auth");

const productRouter = express.Router();

productRouter.route("/products").get(isAuthenticatedUser, getAllProducts);
productRouter.route("/products/new").post(createProduct);
productRouter.route("/products/:id").put(updateProducts);
productRouter
  .route("/products/:id")
  .delete(deleteProducts)
  .get(getProductDetails);

module.exports = productRouter;
