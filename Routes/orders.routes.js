const express = require('express');
const { getAllOrders } = require('../controllers/orders.controller');
const router = express.Router();


router.get('/get-all-orders',getAllOrders);

module.exports = router;