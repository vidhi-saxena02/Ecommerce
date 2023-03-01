const express = require("express");
const productRouter = require("./routes/products.route");
const errorMiddleware = require("./middleware/error");

const app = express();

app.use(express.json());

app.use("/api/v1", productRouter);

app.use(errorMiddleware);

module.exports = app;
