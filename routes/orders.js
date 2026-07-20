const express = require("express");

const {
  checkout,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../controllers/ordersController");

const router = express.Router();

router.route("/")
  .post(checkout)
  .get(getAllOrders);

router.route("/:id")
  .get(getOrderById);

router.route("/:id/status")
  .patch(updateOrderStatus);

module.exports = router;