const express = require("express");
const productRouter = require("./routes/products.route");

const app = express();

app.use(express.json());

app.use("/api/v1", productRouter);

module.exports = app;
