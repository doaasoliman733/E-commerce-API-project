const Cart = require("../models/cart.model");
const Product = require("../models/product.model");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: "guest" }).populate(
    "items.product",
    "name price"
  );

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Cart fetched successfully",
    data: cart,
  });
});

// POST /api/cart/items
const addItemToCart = asyncHandler(async (req, res) => {
  const { product: productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  if (product.stock <= 0) {
    throw new AppError("Product is out of stock", 400);
  }

  let cart = await Cart.findOne({ user: "guest" });

  if (!cart) {
    cart = await Cart.create({
      user: "guest",
      items: [],
      totalPrice: 0,
    });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({
      product: product._id,
      quantity,
      price: product.price,
    });
  }

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product added to cart successfully",
    data: cart,
  });
});

// PATCH /api/cart/items/:productId
const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ user: "guest" });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  const item = cart.items.find(
    (item) => item.product.toString() === req.params.productId
  );

  if (!item) {
    throw new AppError("Product not found in cart", 404);
  }

  if (quantity <= 0) {
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== req.params.productId
    );
  } else {
    item.quantity = quantity;
  }

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Cart updated successfully",
    data: cart,
  });
});

// DELETE /api/cart/items/:productId
const removeCartItem = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: "guest" });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== req.params.productId
  );

  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Product removed from cart successfully",
    data: cart,
  });
});

// DELETE /api/cart
const clearCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: "guest" });

  if (!cart) {
    throw new AppError("Cart not found", 404);
  }

  cart.items = [];
  cart.totalPrice = 0;

  await cart.save();

  res.status(200).json({
    status: "success",
    message: "Cart cleared successfully",
    data: cart,
  });
});

module.exports = {
  getCart,
  addItemToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
};