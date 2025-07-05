const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({
    
    name:String,
    description:String,
    originalprice:Number,
    discountprice:Number,
    status:{
        type:String,
        enum:['In-Stock','Out-Stock'],
        default:'In-Stock'
    },
    
 physicalSpecs: {
    size: {
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
    },
    weight: { type: Number, default: 0 },
    volume: { type: Number, default: 0 },
  },

    quantity:{
        type:Number,
        default:1
    },
    brand: String,
    images:{
       thumbnail:String,
       gallery:[String]
    },
    rating:Number,
    reviews:{
        type:[String]
    },
    isFeatured:Boolean,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    }
    

    

})

module.exports = mongoose.model("Product",ProductSchema);