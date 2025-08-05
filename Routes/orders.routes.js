const express = require('express');
const { getAllOrders, getMyOrders, updateOrderStatus, getOrderById, getMonthlySales, getLatestOrders } = require('../controllers/orders.controller');
const router = express.Router();


router.get('/get-all-orders',getAllOrders);

router.get('/get-my-orders/:userid',getMyOrders);
router.patch('/update-status/:orderId',updateOrderStatus)
router.get('/get-order-by-id/:orderid',getOrderById);
router.get('/get-monthly-sales',getMonthlySales)
router.get('/get-latest-orders',getLatestOrders)

module.exports = router;