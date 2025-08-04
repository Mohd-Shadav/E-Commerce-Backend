const express = require('express');
const { getAllOrders, getMyOrders, updateOrderStatus } = require('../controllers/orders.controller');
const router = express.Router();


router.get('/get-all-orders',getAllOrders);

router.get('/get-my-orders/:userid',getMyOrders);
router.patch('/update-status/:orderId',updateOrderStatus)

module.exports = router;