# E-Commerce Backend API

A RESTful E-Commerce Backend API built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**. The API allows users to manage categories, products, shopping carts, and orders while providing a complete backend for an online store.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

---

# Features

- Categories CRUD API
- Products CRUD API
- Product filtering (category, price range, stock, search)
- Shopping Cart API
- Orders API with checkout process
- Automatic stock updates after checkout
- Centralized error handling
- Environment variable support
- MongoDB data seeding

---

# Prerequisites

Before running the project, make sure you have:

- Node.js (v18 or later)
- MongoDB (Local or MongoDB Atlas)
- npm

---

# Installation

## 1. Clone the repository

```bash
git clone <repository-url>
```

## 2. Navigate into the project

```bash
cd My-E-commerce-API-Project
```

## 3. Install dependencies

```bash
npm install
```

## 4. Create a `.env` file

Example:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
```

## 5. Seed the database

```bash
node seed.js
```

## 6. Start the server

```bash
npm start
```

The API will run on:

```
http://localhost:5000
```

---

# Environment Variables

| Variable | Description |
|-----------|-------------|
| PORT | Server port |
| NODE_ENV | Application environment |
| MONGO_URI | MongoDB connection string |

---

# API Endpoints

## Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | Get all categories |
| GET | /api/categories/:id | Get category by ID |
| POST | /api/categories | Create category |
| PATCH | /api/categories/:id | Update category |
| DELETE | /api/categories/:id | Delete category |

---

## Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create product |
| PATCH | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

### Filtering

```
GET /api/products?category=:categoryId
GET /api/products?search=keyword
GET /api/products?minPrice=100&maxPrice=1000
GET /api/products?inStock=true
```

---

## Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart | Get current cart |
| POST | /api/cart/items | Add product to cart |
| PATCH | /api/cart/items/:productId | Update quantity |
| DELETE | /api/cart/items/:productId | Remove item |
| DELETE | /api/cart | Clear cart |

---

## Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/orders | Checkout and create order |
| GET | /api/orders | Get all orders |
| GET | /api/orders/:id | Get order by ID |
| PATCH | /api/orders/:id/status | Update order status |

---

## Project Structure

```text
.
├── config/
├── controllers/
├── db/
├── middleware/
├── models/
├── node_modules/
├── postman/
├── routes/
├── utils/
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── seed.js
└── README.md
```

### Folder Description

- **config/** – Project configuration files.
- **controllers/** – Business logic for each API endpoint.
- **db/** – MongoDB connection setup.
- **middleware/** – Custom middleware such as error handling.
- **models/** – Mongoose schemas for the database.
- **postman/** – Exported Postman collection.
- **routes/** – API route definitions.
- **utils/** – Helper functions and utilities.

---

# Testing

The API was tested using **Postman**. A complete Postman Collection is included in the `postman/` folder.

---

# Author

Developed as the DECI Graduation Project.
