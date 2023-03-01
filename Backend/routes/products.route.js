const {
  createProduct,
  getAllProducts,
  updateProducts,
} = require("../controller/product.controller");

const express = require("express");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route("/products/new").post(createProduct);
productRouter.route("/products/:id").put(updateProducts);

module.exports = productRouter;
