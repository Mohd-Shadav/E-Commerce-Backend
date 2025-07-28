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
  address: [{
  houseno: {type:String},      // Flat, house, or door number
  street:  {type:String},           // Street name or road
  landmark:  {type:String},         // Optional: near temple, school, etc.
  city:  {type:String},             // City or town
  district:  {type:String},         // Optional: for rural areas
  state:  {type:String},            // State/Province
  pincode:  {type:String},          // Postal code / ZIP
  country: {type:String},          // Country (default: 'India' or 'USA', etc.)
  type:  {type:String},             // Optional: 'Home', 'Work', etc.
    isDefault: { type: Boolean, default: false },       // Optional: mark this as default address
  mobile:{
    type:Number
  }
}],
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