const CategorySchema = require('../models/CategorySchema');

exports.createCategory = async (req,res)=>{
    let category = await CategorySchema.create(req.body);
    res.send(category);
    
}

exports.getCategories = async(req,res)=>{
try{
        let category = await CategorySchema.find();
    
    res.status(200).send(category);
}catch(err){
    console.log(err)
}
}

