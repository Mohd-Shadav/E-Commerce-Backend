const express = require('express');
const { createCategory, getCategories } = require('../controllers/category.controller');
const router = express.Router();


//get categories
router.get('/getCategories',getCategories);

//create new category
router.post('/create-category',createCategory);


module.exports = router;