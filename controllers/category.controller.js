const CategorySchema = require('../models/CategorySchema');

exports.createCategory = async (req,res)=>{
    let category = await CategorySchema.create(req.body);
    res.send(category);
    
}

exports.getCategories = async(req,res)=>{
    let category = await CategorySchema.find();
    
    res.json(category);
}