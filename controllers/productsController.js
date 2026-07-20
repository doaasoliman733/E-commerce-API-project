const Product = require("../models/product.model");
const Category = require("../models/category.model");

const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/products
const getAllProducts = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.category) {
    filter.category = req.query.category;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};

    if (req.query.minPrice) {
      filter.price.$gte = Number(req.query.minPrice);
    }

    if (req.query.maxPrice) {
      filter.price.$lte = Number(req.query.maxPrice);
    }
  }

  if (req.query.inStock === "true") {
    filter.stock = { $gt: 0 };
  }

  if (req.query.search) {
    filter.$or = [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  const products = await Product.find(filter).populate("category", "name");

  res.status(200).json({
    status: "success",
    message: "Products fetched successfully",
    data: products,
  });
});

// GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category",
    "name description"
  );

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Product fetched successfully",
    data: product,
  });
});

// POST /api/products
const createProduct = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.body.category);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  const product = await Product.create(req.body);

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: product,
  });
});

// PATCH /api/products/:id
const updateProduct = asyncHandler(async (req, res) => {
  if (req.body.category) {
    const category = await Category.findById(req.body.category);

    if (!category) {
      throw new AppError("Category not found", 404);
    }
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: product,
  });
});

// DELETE /api/products/:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
    data: product,
  });
});

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};