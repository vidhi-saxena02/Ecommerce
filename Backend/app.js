const express = require("express");
const productRouter = require("./routes/products.route");
const errorMiddleware = require("./middleware/error");
const userRouter = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const OrderRoute = require("./routes/order.route");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", OrderRoute);

app.use(errorMiddleware);

module.exports = app;
