const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
      type:String,
      required: [true, 'Name is required'],
    },
    email:{
      type:String,
      required: [true, 'Email is required'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Email must be a valid email address']
    },
  address: {
  houseNumber: String,      // Flat, house, or door number
  street: String,           // Street name or road
  landmark: String,         // Optional: near temple, school, etc.
  city: String,             // City or town
  district: String,         // Optional: for rural areas
  state: String,            // State/Province
  pincode: String,          // Postal code / ZIP
  country: String,          // Country (default: 'India' or 'USA', etc.)
  type: String,             // Optional: 'Home', 'Work', etc.
  isDefault: Boolean        // Optional: mark this as default address
},
mobile:{
    type:Number,
    required: [true, 'Mobile number is required'],
    match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits']
    
},
profileImage:String,
password:{
  type:String,
  required: [true, 'Password is required'],
},
cart: [
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    
    },
    quantity: {
      type: Number,

      min: 1,
      default: 1
    },
    price: {
      type: Number,
    
 
    }
  }
]

})

module.exports = mongoose.model("User",UserSchema);