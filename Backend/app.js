const express = require("express");
const productRouter = require("./routes/products.route");
const errorMiddleware = require("./middleware/error");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);

app.use(errorMiddleware);

module.exports = app;
