const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const ProductSchema = require('./models/ProductSchema');
const CategorySchema = require('./models/CategorySchema');
const PORT =process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();


app.get('/get-products',async (req,res)=>{
    let products = await ProductSchema.find().populate('category');

    // let arr = products.map(product=>product.name);
    console.log(products)
    res.json(products);
})

app.post('/create-category',async (req,res)=>{
    const category = await CategorySchema.create({
         categoryName:"Shirts",
         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1GKWfVk7_3bkgCfJtXOAqB7HubqDbZ7ssrw&s"
    })
    res.send(category);
    
})

app.post('/create-product', async (req,res)=>{
   try{
    let product = await ProductSchema.create(req.body);

    res.send(product);

   }catch(err){
    console.log("nor created ::",err);
   }
})

app.listen(PORT,()=>{
    console.log('Running on Port : ',PORT)
})
 
