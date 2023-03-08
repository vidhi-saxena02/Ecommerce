const Errorhandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const UserDatabase = require("../models/user.schema");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

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

// Logout user => /api/v1/logout

exports.Logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

// FORGOT PASSWORD
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await UserDatabase.findOne({ email: req.body.email });

  if (!user) {
    return next(new Errorhandler("User not found with this email", 404));
  }

  // get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetPasswordUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new Errorhandler(error.message, 500));
  }
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await UserDatabase.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await UserDatabase.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);

  if (!isMatched) {
    return next(new Errorhandler("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new Errorhandler("Password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // Update avatar: TODO

  const user = await UserDatabase.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await UserDatabase.find();

  res.status(200).json({
    success: true,
    users,
  });
});
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const users = await UserDatabase.findById(req.params.id);

  if (!users) {
    return next(
      new Errorhandler(`User with Id ${req.params.id} not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    users,
  });
});

exports.updateRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await UserDatabase.findByIdAndUpdate(
    req.params.id,
    newUserData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    user,
  });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await UserDatabase.findById(req.params.id);

  if (!user) {
    return next(
      new Errorhandler(`User with Id ${req.params.id} not found`, 404)
    );
  }
  //TODO: Delete user avatar

  await UserDatabase.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
