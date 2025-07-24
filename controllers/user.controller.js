const UserSchema = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ProductSchema = require("../models/ProductSchema");
const { default: mongoose } = require("mongoose");
// const cookieParser 

exports.getAllUsers = async (req, res) => {
  try {
    let users = await UserSchema.find();

    res.json(users);
  } catch (err) {
    console.log("Internal server error - Users Not Found ", err);
  }
};


exports.getUser = async(req,res)=>{


    let {userid} = req.params;

if (!mongoose.Types.ObjectId.isValid(userid)) {
  return res.status(400).send("Invalid user ID");
}
      else{

 
      let user = await UserSchema.findOne({_id:userid}).select("-password").populate("cart.product");

      if(!user) return res.status(401).send("Not Found User..");

      res.status(200).json(user)
      }
  
    

 
}

exports.createUser = async (req, res) => {
  try {
    let { name, email, mobile, password } = req.body;
    
    let checkEmail = await UserSchema.findOne({email});

    if(checkEmail) return res.status(409).send("User Already Present...")

   bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(401).send("Failed to generate salt...");
      else {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.status(401).send("failed to generate hash..");
          else {
            let user = await UserSchema.create({
              name,
              email,
              mobile,
              password:hash,
            });

            let token = jwt.sign({email},process.env.JWT_SECRET)

           res.cookie("userToken", token, {
  httpOnly: true,
  secure: false,         // Set true in production (with HTTPS)
  sameSite: "lax",       // Or "none" if using cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

            
            res.status(200).json(user);
          }
        });
      }
    });
  } catch (err) {
    console.log("intrenal server error : ", err);
  }
};


exports.getAuthorization = async (req,res) =>{

 let user = req.user;



 if(!user) return res.status(401).send("Internal Server Error...");

 let data = await UserSchema.findOne({email:user.email}).select("-password").populate("cart.product")


 res.status(200).json(data);

}


exports.addToCart = async (req,res)=>{
 try {
    const { userid, productid } = req.params;

    // 1. Fetch product
    const product = await ProductSchema.findById(productid);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // 2. Find the user
    const user = await UserSchema.findById(userid);
    if (!user) return res.status(404).json({ error: "User not found" });

    // 3. Check if product already in cart
    const cartItemIndex = user.cart.findIndex(
      (item) => item.product.toString() === productid
    );

    if (cartItemIndex > -1) {
      // If product already in cart, increase quantity
      user.cart[cartItemIndex].quantity += 1;
    } else {
      // Else, add new product to cart
      user.cart.push({
        product: product._id,
        quantity: 1,
        price: product.price, // optional: store price at time of adding
      });
    }

    // 4. Save the user
    await user.save();

    res.status(200).json({ cart: user.cart ,product});

  } catch (err) {
    console.error("Error adding to cart:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

exports.incrementQuantity = async (req,res) =>{


  try{
    let {userid,productid} = req.params;

    let user = await UserSchema.findOne({_id:userid})

    if(!user) return res.status(401).send("user not found");

    let product = await ProductSchema.findOne({_id:productid});
      if(!product) return res.status(401).send("product not found");


    const cartItemIndex = user.cart.findIndex((item)=> item.product.toString() === productid)

    user.cart[cartItemIndex].quantity +=1;

    await user.save();
    res.status(200).json({ cart: user.cart });

  }catch(err)
  {
    console.log("Something went wrong")
  }
}


exports.decrementQuantity = async (req,res) =>{
   try{
    let {userid,productid} = req.params;

    let user = await UserSchema.findOne({_id:userid})

    if(!user) return res.status(401).send("user not found");

    let product = await ProductSchema.findOne({_id:productid});
      if(!product) return res.status(401).send("product not found");


    const cartItemIndex = user.cart.findIndex((item)=> item.product.toString() === productid)

    user.cart[cartItemIndex].quantity -=1;

    await user.save();
    res.status(200).json({ cart: user.cart });

  }catch(err)
  {
    console.log("Something went wrong")
  }

}


exports.removeItemFromCart = async(req,res)=>{
  try{
    let {userid,productid} = req.params;

    let user = await UserSchema.findOne({_id:userid})

    if(!user) return res.status(401).send("user not found");

    let product = await ProductSchema.findOne({_id:productid});
      if(!product) return res.status(401).send("product not found");


    const cartItemIndex = user.cart.findIndex((item)=> item.product.toString() === productid)

    if (cartItemIndex === -1) {
      return res.status(404).send("Product not in cart");
    }

    //  Remove item from cart
    user.cart.splice(cartItemIndex, 1);

   

    await user.save();
    res.status(200).json({ cart: user.cart });

  }catch(err)
  {
    console.log("Something went wrong")
  }

}

exports.userLogin =async (req,res)=>{

  try{
let token = jwt.sign({ email: req.user.email }, process.env.JWT_SECRET);

res.cookie("userToken", token, {
  httpOnly: true,
  secure: false, // true if using HTTPS
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

res.status(200).json({
  message: "Login successful",
  user: req.user,
});

  }catch(err)
  {
    res.status(401).send("something went wrong");
  
  }

}


exports.userLogout = async (req,res)=>{

  try{
    res.cookie('userToken',"");
    res.status(200).send("Token Deleted...");

  }catch(err){

    res.status(401).send("Internal Server Error",err);

  }


}