const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
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
});

module.exports = mongoose.model('Order', orderSchema);