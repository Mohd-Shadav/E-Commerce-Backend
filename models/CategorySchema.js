const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    categoryname:{
        type:String,
        required:true
    },
    categoryicon:{
           type:String,
        required:true
    }
  
})

module.exports = mongoose.model('Category',CategorySchema);