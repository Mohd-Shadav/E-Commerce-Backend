const OrderSchema = require("../models/OrderSchema")



exports.getAllOrders = async (req,res)=>{
  try{
    let orders = await OrderSchema.find().sort({placedAt:-1}).populate({
      path:"user",
      select:"-password"
    });
  
    res.status(200).json(orders);

  }catch(err)
  {
    res.status(404).send("Not Found");
  }
}

exports.getMyOrders = async (req,res)=>{
  try{


    let {userid} = req.params



    let orders = await OrderSchema.find({user:userid}).sort({placedAt:-1}).populate({
      path:"user",
      select:"-password"
    });
  
    res.status(200).json(orders);

  }catch(err)
  {
      res.status(404).send("Not Found");
  }
}

