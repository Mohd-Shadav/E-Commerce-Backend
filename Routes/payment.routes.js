const express = require('express');
const { createPayment, verifyPayment } = require('../controllers/payment.controller');
const bodyParser = require('body-parser');
const router = express.Router();


router.post('/create-payment-link',createPayment)
router.post('/verify',bodyParser.raw({ type: 'application/json' }),verifyPayment)

module.exports = router;


