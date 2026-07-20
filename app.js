require("dotenv").config();

const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");

const connectDB = require("./db/connectDB");
const categoryRoutes = require("./routes/categoryRoutes");
const AppError = require("./utils/AppError");
const errorHandler = require("./middleware/errorHandler");
const productRoutes = require("./routes/products");

const app = express();

app.use(express.json());
app.use(mongoSanitize());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();