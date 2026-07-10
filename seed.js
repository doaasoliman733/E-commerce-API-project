require("dotenv").config();

const connectDB = require("./db/connectDB");

const seedData = async () => {
  await connectDB();

  console.log("Seed script connected to database");
};

seedData();