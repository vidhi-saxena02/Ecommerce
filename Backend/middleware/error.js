const Errorhandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new Errorhandler(message, 400);
  }

  //Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
    err = new Errorhandler(message, 400);
  }

  //JWt Error

  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is invalid. Try Again!!!";
    err = new Errorhandler(message, 400);
  }

  //JWT Expired Error
  if (err.name === "TokenExpiredError") {
    const message = "Json Web Token is expired. Try Again!!!";
    err = new Errorhandler(message, 400);
  }

  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
