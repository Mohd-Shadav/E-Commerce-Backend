const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')


const PORT =process.env.PORT
const productsRoutes = require('./Routes/products.routes');
const categoryRoutes = require('./Routes/category.routes');
const userRoutes = require('./Routes/user.routes');
const adminRoutes = require('./Routes/admin.routes');

// app.use(express.json());

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser());
app.use(bodyParser.json({limit:"20mb"}))
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
// app.use(express.urlencoded({extended:true}));

connectDB();


//products
app.use('/api/products',productsRoutes);

//category
app.use('/api/category',categoryRoutes);

//users
app.use('/api/users',userRoutes);

//admin routes
app.use('/api/admin',adminRoutes);






app.listen(PORT,()=>{
    console.log('Running on Port : ',PORT)
})
 
