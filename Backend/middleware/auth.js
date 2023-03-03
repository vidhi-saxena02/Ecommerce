const catchAsyncErrors = require("./catchAsyncErrors");
const Errorhandler = require("../utils/errorhandler");
const jwt = require("jsonwebtoken");
const UserDatabase = require("../models/user.schema");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new Errorhandler("Login first to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserDatabase.findById(decodedData.id);

  next();
});
