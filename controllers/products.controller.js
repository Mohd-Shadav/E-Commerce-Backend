const CategorySchema = require("../models/CategorySchema");
const ProductSchema = require("../models/ProductSchema");


exports.getProducts =async (req,res)=>{
    let products = await ProductSchema.find().populate('category');

    // let arr = products.map(product=>product.name);
    // console.log(products)
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

exports.updateProduct = async(req,res)=>{


   

    try{
        
    let productId = req.body._id ||req.params._id;

    if(!productId)
    {
        return res.status(404).send("Not Found...")
    }

   
        const thumbnail = req.files?.thumbnail?.[0]?.buffer ||undefined;
        const gallery = req.files?.gallery.map(item=>item.buffer) ||undefined

        const updateData = {
            ...req.body
        }

        if(thumbnail)
        {
            updateData.thumbnail = thumbnail;
        }

        if(gallery && gallery.length>0)
        {
            updateData.gallery = gallery;
        }


        const updateProducts = await ProductSchema.findByIdAndUpdate(productId,updateData,{new:true});

         if(!updateProducts) return res.status(401).send("Something went wrong...")

         res.status(200).send(updateProducts);

    }catch(err)
    {
        console.log("err");
    }


}

exports.deleteProduct = async (req,res)=>{
    let {_id} = req.body;
    console.log(_id);

    try{
         let product = await ProductSchema.findOneAndDelete({_id});
         res.status(200).send("Product Deleted Successfully ",product);

    }catch(err){
        console.log(err);

    }


}


exports.getProductsByCategory = async(req,res)=>{
    try{
        let {category} = req.params;

        let categoryData = await CategorySchema.findOne({categoryname:category});
        
        let data = await ProductSchema.find({category:categoryData._id})

        res.status(200).json(data);

    }catch(err){
        console.log(err)
    }
}