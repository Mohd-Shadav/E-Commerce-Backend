const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: Object,
  
    required: true
  },
  items: [
    {
      product: {
        type: Object,
       
        required: true
      },
      variant:{
        type:String
      },
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: true
      }
    }
  ],
  orderId:{
    type:String
  },
  shippingAddress: {
   type:Object
  },
  paymentMethod: {
    type: String,
    
   
  },
  paymentStatus: {
    type: String,
    
  },
  orderStatus: {
    type: String,
    
  },
  referenceID:{
    type:String
  },
  totalAmount: {
    type: Number,
    required: true
  },
  placedAt: {
    type: Date,
    default: Date.now
  }
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);