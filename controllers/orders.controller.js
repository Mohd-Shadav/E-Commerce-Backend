const OrderSchema = require("../models/OrderSchema")



exports.getAllOrders = async (req,res)=>{
    let orders = await OrderSchema.find();
    res.json(orders);
}

