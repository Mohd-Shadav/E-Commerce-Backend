const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryName:String,
    image:String,
  
})

module.exports = mongoose.model('Category',CategorySchema);