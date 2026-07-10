require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("./db/connectDB");

const Category = require("./models/category.model");
const Product = require("./models/product.model");
const Order = require("./models/order.model");

const seedData = async () => {
  try {
    await connectDB();

    await Order.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    const categories = await Category.insertMany([
      {
        name: "Electronics",
        description: "Devices and electronic accessories",
        slug: "electronics",
      },
      {
        name: "Clothing",
        description: "Fashion and everyday wear",
        slug: "clothing",
      },
      {
        name: "Home",
        description: "Home essentials and furniture",
        slug: "home",
      },
    ]);

    const products = [
      {
        name: "Wireless Headphones",
        description: "Bluetooth over-ear headphones with noise cancellation",
        price: 2500,
        stock: 12,
        category: categories[0]._id,
        images: ["headphones.jpg"],
        inStock: true,
      },
      {
        name: "Smart Watch",
        description: "Fitness tracking smartwatch with heart-rate monitor",
        price: 3200,
        stock: 8,
        category: categories[0]._id,
        images: ["smartwatch.jpg"],
        inStock: true,
      },
      {
        name: "Oversized Hoodie",
        description: "Comfortable cotton hoodie for everyday wear",
        price: 900,
        stock: 20,
        category: categories[1]._id,
        images: ["hoodie.jpg"],
        inStock: true,
      },
      {
        name: "Classic Jeans",
        description: "Blue straight-fit denim jeans",
        price: 1100,
        stock: 15,
        category: categories[1]._id,
        images: ["jeans.jpg"],
        inStock: true,
      },
      {
        name: "Desk Lamp",
        description: "Modern LED desk lamp with adjustable brightness",
        price: 650,
        stock: 10,
        category: categories[2]._id,
        images: ["lamp.jpg"],
        inStock: true,
      },
      {
        name: "Storage Basket",
        description: "Woven storage basket for organizing home items",
        price: 400,
        stock: 18,
        category: categories[2]._id,
        images: ["basket.jpg"],
        inStock: true,
      },
    ];

    const createdProducts = await Product.insertMany(products);

    console.log(
      `Seeding completed: ${categories.length} categories and ${createdProducts.length} products added successfully`
    );
  } catch (error) {
    console.error("Seeding error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

seedData();