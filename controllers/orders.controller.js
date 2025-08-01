const OrderSchema = require("../models/OrderSchema")



exports.getAllOrders = async (req,res)=>{
  try{
    let orders = await OrderSchema.find().sort({placedAt:-1});
    console.log(orders)
    res.status(200).json(orders);

  }catch(err)
  {
    res.status(404).send("Not Found");
  }
}

