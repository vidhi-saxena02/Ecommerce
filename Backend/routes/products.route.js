const {
  createProduct,
  getAllProducts,
  updateProducts,
  deleteProducts,
} = require("../controller/product.controller");

const express = require("express");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);
productRouter.route("/products/new").post(createProduct);
productRouter.route("/products/:id").put(updateProducts);
productRouter.route("/products/:id").delete(deleteProducts);

module.exports = productRouter;
