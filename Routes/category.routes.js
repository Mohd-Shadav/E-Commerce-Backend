const express = require('express');
const { createCategory, getCategories, deleteCategory, updateCategory, getSubCategories, getCategoryIdByName } = require('../controllers/category.controller');
const upload = require('../config/multer.config');
const router = express.Router();


//get categories
router.get('/get-categories',getCategories);

//create new category
router.post('/create-category', upload.fields([
    { name: 'categoryicon', maxCount: 1 },
    
  ]),createCategory);

  router.put('/update-category',updateCategory);

  router.delete('/delete-property',deleteCategory);

  router.get('/:category/sub-category',getSubCategories);

  router.get('/category-name/:categoryname',getCategoryIdByName);

module.exports = router;