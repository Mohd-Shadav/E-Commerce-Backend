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


    console.log(orders)
    
  
    res.status(200).json(orders);

  }catch(err)
  {
      res.status(404).send("Not Found");
  }
}


exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    console.log(orderId,status)

    const order = await OrderSchema.findByIdAndUpdate(orderId, {
      orderStatus: status,
    }, { new: true });

    if (!order) return res.status(404).send("Order not found");

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};