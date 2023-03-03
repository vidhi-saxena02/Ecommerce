const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const UserDatabase = require("../models/user.schema");
const sendToken = require("../utils/jwtToken");

//Register a user => /api/v1/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await UserDatabase.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatars/1",
      url: "profilePicUrl",
    },
  });

  sendToken(user, 201, res);
});

// Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new Errorhandler("Please enter email & password", 400));
  }

  const user = await UserDatabase.findOne({ email }).select("+password");

  if (!user) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new Errorhandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});
