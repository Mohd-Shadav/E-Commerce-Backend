const express = require('express');
const { getProducts, createProducts, deleteProducts, deleteProduct, updateProducts, updateProduct, getProductsByCategory, getproductById, getNewProducts, getFeaturedProducts, getPopularProductsCategory, getFilterizedData, getProductsByName } = require('../controllers/products.controller');
const upload = require('../config/multer.config');
const router = express.Router();

router.get('/get-products',getProducts);


router.post('/create-product',  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
  ]),createProducts);


  router.put('/update-product',updateProduct)

  router.delete('/delete-product',deleteProduct)

  router.get('/category/:category',getProductsByCategory)

  router.get('/get-product/:productId',getproductById)

  router.get('/get-new-products',getNewProducts)

  router.get('/get-featured-products',getFeaturedProducts)

  router.get('/get-popular-products/:category',getPopularProductsCategory)

  router.post('/:category/get-filterized-data',getFilterizedData)

  router.get('/get-product-by-name/:productname',getProductsByName);

module.exports = router