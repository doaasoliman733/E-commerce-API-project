const Category = require("../models/category.model");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

// GET /api/categories
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();

  res.status(200).json({
    status: "success",
    message: "Categories fetched successfully",
    data: categories,
  });
});

// GET /api/categories/:id
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Category fetched successfully",
    data: category,
  });
});

// POST /api/categories
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const slug = name.toLowerCase().trim().replace(/\s+/g, "-");

  const category = await Category.create({
    name,
    description,
    slug,
  });

  res.status(201).json({
    status: "success",
    message: "Category created successfully",
    data: category,
  });
});

// PATCH /api/categories/:id
const updateCategory = asyncHandler(async (req, res) => {
  if (req.body.name) {
    req.body.slug = req.body.name.toLowerCase().trim().replace(/\s+/g, "-");
  }

  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Category updated successfully",
    data: category,
  });
});

// DELETE /api/categories/:id
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new AppError("Category not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Category deleted successfully",
    data: category,
  });
});

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};