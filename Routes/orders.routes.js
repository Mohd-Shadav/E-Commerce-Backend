const express = require('express');
const { getAllOrders, getMyOrders } = require('../controllers/orders.controller');
const router = express.Router();


router.get('/get-all-orders',getAllOrders);

router.get('/get-my-orders/:userid',getMyOrders);

module.exports = router;