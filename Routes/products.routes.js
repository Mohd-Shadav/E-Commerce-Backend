const express = require('express');
const { getProducts, createProducts } = require('../controllers/products.controller');
const router = express.Router();

router.get('/get-products',getProducts);
router.post('/create-product',createProducts);

module.exports = router