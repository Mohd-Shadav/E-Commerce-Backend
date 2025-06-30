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
    
    physicalSpecs:{
        size:{
        type:[String],
        enum:['S','M',"L","XL","XXL"],
        default:'M'
    },
    weight:Number,
    volume:Number,
    },

    quantity:{
        type:Number,
        default:1
    },
    brand: String,
    images:{
        image1:String,
        image2:String,
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