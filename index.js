const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

const PORT =process.env.PORT
const productsRoutes = require('./Routes/products.routes');
const categoryRoutes = require('./Routes/category.routes');
const userRoutes = require('./Routes/user.routes');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectDB();


//products
app.use('/api/products',productsRoutes);

//category
app.use('/api/category',categoryRoutes);

//users
app.use('/api/users',userRoutes);




app.listen(PORT,()=>{
    console.log('Running on Port : ',PORT)
})
 
