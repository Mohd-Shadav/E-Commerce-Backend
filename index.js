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
const paymentRoutes = require('./Routes/payment.routes');
const orderRoutes = require('./Routes/orders.routes');

// app.use(express.json());
const allowedOrigin = [
   "http://localhost:5173",
   "http://localhost:5174"
]

app.use(cors({
    origin:allowedOrigin,
    credentials:true
}))
app.use(cookieParser());
// app.use(bodyParser.json({limit:'20mb'}))

// app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
// // app.use(express.urlencoded({extended:true}));

//After-----------------------------------------------
// Middleware that skips parsing for /api/payment/verify
app.use((req, res, next) => {
  if (req.originalUrl === '/api/payment/verify') {
    return next(); // skip parsing for Razorpay webhook
  }

  bodyParser.json({ limit: '20mb' })(req, res, () => {
    bodyParser.urlencoded({ extended: true, limit: '20mb' })(req, res, next);
  });
});
// --------------------------
connectDB();

//payment routes
app.use('/api/payment',paymentRoutes)

//products
app.use('/api/products',productsRoutes);

//category
app.use('/api/category',categoryRoutes);

//users
app.use('/api/users',userRoutes);

//admin routes
app.use('/api/admin',adminRoutes);

//order routes
app.use('/api/orders',orderRoutes);








app.listen(PORT,()=>{
    console.log('Running on Port : ',PORT)
})
 
