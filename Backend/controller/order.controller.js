const OrderDatabase = require("../models/orders.schema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ProductDatabase = require("../models/product.schema");
// Create new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await OrderDatabase.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderDatabase.findById(req.params.id).populate(
    "user",
    "name email"
  ); // populate() is a mongoose method that allows us to populate the user field with the name and email fields from the User schema
  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logined user orders => /api/v1/orders/me

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await OrderDatabase.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// get All orders => /api/v1/admin/orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await OrderDatabase.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update / Process order => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderDatabase.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    order,
  });
});

async function updateStock(id, quantity) {
  const product = await ProductDatabase.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

//delete Order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await OrderDatabase.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  await OrderDatabase.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "Order deleted",
    order,
  });
});
