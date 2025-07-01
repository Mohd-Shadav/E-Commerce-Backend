const ProductSchema = require("../models/ProductSchema");


exports.getProducts =async (req,res)=>{
    let products = await ProductSchema.find().populate('category');

    // let arr = products.map(product=>product.name);
    console.log(products)
    res.json(products);
}

exports.createProducts = async (req,res)=>{
   try{
    let product = await ProductSchema.create(req.body);

    res.send(product);

   }catch(err){
    console.log("nor created ::",err);
   }
}