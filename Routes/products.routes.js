const express = require('express');
const { getProducts, createProducts } = require('../controllers/products.controller');
const upload = require('../config/multer.config');
const router = express.Router();

router.get('/get-products',getProducts);
router.post('/create-product',  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
  ]),createProducts);

module.exports = router