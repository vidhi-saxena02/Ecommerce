const { getAllProducts } = require("../controller/product.controller");

const express = require("express");

const productRouter = express.Router();

productRouter.route("/products").get(getAllProducts);

module.exports = productRouter;
