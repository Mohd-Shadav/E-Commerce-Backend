const ProductSchema = require("../models/ProductSchema");


exports.getProducts =async (req,res)=>{
    let products = await ProductSchema.find().populate('category');

    // let arr = products.map(product=>product.name);
    console.log(products)
    res.json(products);
}

exports.createProducts = async (req,res)=>{
   try{
    let thumbnail = req.files?.thumbnail?.[0]?.buffer || null;
    const gallery = req.files?.gallery.map(item=>item.buffer) || [];
    let product = await ProductSchema.create({...req.body,thumbnail,gallery});


    res.status(200).send(product);

   }catch(err){
    console.log("nor created ::",err);
   }
}