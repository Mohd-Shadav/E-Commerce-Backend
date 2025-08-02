const mongoose = require("mongoose");

const PendingOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: [
    {
      productid: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      productname:{
        type:String
      },
      productimage:{
        type:String
      },
      rating:{
        type:String
      },
      variant: {
        type:String
      },
      quantity: {
        type:Number
      },
      price: {
        type:Number
      },
    },
  ],
  deliveryAddress: Object,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PendingOrder", PendingOrderSchema);
