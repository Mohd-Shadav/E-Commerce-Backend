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

    console.log(userid)



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


exports.getOrderById = async(req,res)=>{
  try{
    let {orderid} = req.params;


    // console.log(orderid)
    
    let data = await OrderSchema.find({_id:orderid})
    res.status(200).json(data);

  }catch(err)
  {
    res.status(400).send("no order found")
  }
}

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status,source } = req.body;
   



    const order = await OrderSchema.findByIdAndUpdate(orderId, {
      orderStatus: status,
      source
    }, { new: true });

    if (!order) return res.status(404).send("Order not found");

    res.status(200).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


// models/Order.js assumed to have: totalAmount, placedAt, orderStatus
exports.getMonthlySales = async (req, res) => {
  try {
    const monthlySales = await OrderSchema.aggregate([
      {
        $match: {
          orderStatus: "Delivered",
        },
      },
      {
        // Add total quantity of products per order
        $addFields: {
          totalProducts: { $sum: "$items.quantity" },
        },
      },
      {
        $group: {
          _id: { $month: "$placedAt" },
          totalSales: { $sum: "$totalAmount" },
          productsDelivered: { $sum: "$totalProducts" },
        },
      },
      {
        $project: {
          month: "$_id",
          sales: "$totalSales",
          productsDelivered: 1,
          _id: 0,
        },
      },
      {
        $sort: { month: 1 },
      },
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formatted = monthlySales.map(item => ({
      month: monthNames[item.month - 1],
      sales: item.sales,
      productsDelivered: item.productsDelivered,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("Error getting monthly sales:", err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.getLatestOrders = async (req,res)=>{
  try{

    let order = await OrderSchema.find().sort({placedAt:-1}).limit(5).populate({
      path:"user",
      select:"-password"
    })

    res.status(200).json(order)

  }catch(err){
    res.status(404).send("No latest Orders found")
  }
}