const {
  createProduct,
  getAllProducts,
} = require("../controller/product.controller");

const express = require("express");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route("/products/new").post(createProduct);

module.exports = productRouter;
