const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// POST /api/orders
const checkout = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: "guest" }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    throw new AppError("Cart is empty", 400);
  }

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    if (!product) {
      throw new AppError(`Product "${item.name}" not found`, 404);
    }

    if (product.stock < item.quantity) {
      throw new AppError(
        `${product.name} only has ${product.stock} item(s) in stock`,
        400
      );
    }

    totalPrice += product.price * item.quantity;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    });
  }

  const order = await Order.create({
    orderNumber: `ORD-${Date.now()}`,
    items: orderItems,
    totalPrice,
    shippingAddress: req.body.shippingAddress,
  });

  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);
    product.stock -= item.quantity;
    await product.save();
  }

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    data: order,
  });
});

// GET /api/orders
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();

  res.status(200).json({
    status: "success",
    message: "Orders fetched successfully",
    data: orders,
  });
});

// GET /api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Order fetched successfully",
    data: order,
  });
});

// PATCH /api/orders/:id/status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Order status updated successfully",
    data: order,
  });
});

module.exports = {
  checkout,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};