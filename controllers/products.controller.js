const CategorySchema = require("../models/CategorySchema");
const ProductSchema = require("../models/ProductSchema");


exports.getProducts =async (req,res)=>{
    let products = await ProductSchema.find().populate('category');

    
    res.status(200).json(products);
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
        
        let data = await ProductSchema.find({category:categoryData._id}).populate('category');

        res.status(200).json(data);

    }catch(err){
        console.log(err)
    }
}

exports.getproductById = async(req,res)=>{
    try{
        const {productId} = req.params;


     

        let data = await ProductSchema.findOne({_id:productId}).populate('category');

        res.status(200).json(data);

    }catch(err)
    {
        console.log(err)
    }
}

exports.getNewProducts = async (req,res)=>{

    try{

        let data = await ProductSchema.find({isNew:true}).populate('category');

        res.status(200).json(data)
    }catch(err)
    {
        console.log(err);
    }
}

exports.getFeaturedProducts = async (req,res)=>{

    try{

        let data = await ProductSchema.find({isFeatured:true}).populate('category');

        res.status(200).json(data)
    }catch(err)
    {
        console.log(err);
    }
}

exports.getPopularProductsCategory = async (req,res)=>{
    try{
        let {category} = req.params;
    

        let categoryData = await CategorySchema.findOne({categoryname:category});
        
        let data = await ProductSchema.find({category:categoryData._id,isPopular:true}).populate('category');
        

        res.status(200).json(data);

    }catch(err){
        console.log(err)
    }
}

exports.getFilterizedData = async (req,res)=>{
    try{
        
        let {subcategory,pricerange,rating}  = req.body;
      
        let {category} = req.params;

         let categoryData = await CategorySchema.findOne({categoryname:category})

    if(subcategory==="")
    {
        let data = await ProductSchema.find({category:categoryData._id,discountprice:{$gt:pricerange[0]?pricerange[0]:100,$lt:pricerange[1]?pricerange[1]:60000},rating:{$gte:rating}})
      
          return res.status(200).json(data);

    }else{
         let data = await ProductSchema.find({category:categoryData._id,subcategory,discountprice:{$gt:pricerange[0]?pricerange[0]:100,$lt:pricerange[1]?pricerange[1]:60000},rating:{$gte:rating}})
       
          return res.status(200).json(data);

    }


       
 




    }catch(err)
    {
        res.status(400).send(err);
    }
}


exports.getProductsByName = async (req,res) =>{
    try{

       
        let {productname}  = req.params;

       let products = await ProductSchema.find({
  name: { $regex: productname, $options: 'i' } // 'i' for case-insensitive
});

res.status(200).json(products);


    }catch(err)
    {
        res.status(404).send("Not Found")
    }
}