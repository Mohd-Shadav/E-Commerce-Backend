const Razorpay = require("razorpay");

const crypto = require("crypto");
const UserSchema = require("../models/UserSchema");

const OrderSchema = require("../models/OrderSchema");
const ProductSchema = require("../models/ProductSchema");
const PendingOrderSchema = require("../models/PendingOrderSchema");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// exports.createPayment = async (req, res) => {
//   try {
//     const { user, order, deliveryAddress } = req.body;

//     console.log(order)


//     const userData = await UserSchema.findById(user).select("-password");
//     if (!userData) return res.status(404).send("User not found");


//     const paymentLink = await instance.paymentLink.create({
//       amount: order.price * 100, // Razorpay expects amount in paise
//       currency: "INR",
//       description: `Order for ${userData.name}`,
//       customer: {
//         name: userData.name,
//         email: userData.email,
//         contact: String(deliveryAddress.mobile), //  use `contact` instead of `mobile`
//       },
//     notes: {
//   userId: user.toString(),
//   productID:order.productid,
//   variant:order.variant,
//   quantity:order.quantity,
//   price:order.price,
//   orderId:`ORD_NO_${Math.floor(Math.random()*10000)}`,
//   deliveryAddress:JSON.stringify(deliveryAddress),
// },
//       notify: {
//         sms: true,
//         email: true,
//       },
//       reminder_enable: true,
//       callback_url: "http://localhost:5174/payment-success",
//       callback_method: "get",
//     });

//     res.status(200).json({ success: true, link: paymentLink.short_url });
//   } catch (err) {
//   console.error("🔥 Razorpay Error (full):", err);
//   res.status(400).send("Failed to generate payment link...");
// }
// };


exports.createPayment = async (req, res) => {
  try {
    const { user, order, deliveryAddress } = req.body;

 

    const userData = await UserSchema.findById(user).select("-password");
    if (!userData) return res.status(404).send("User not found");

    const totalAmount = order.reduce((acc, item) => acc + item.price, 0);

    const pendingOrder = await PendingOrderSchema.create({
      user,
      order,
      deliveryAddress,
      totalAmount,
    });

    const paymentLink = await instance.paymentLink.create({
      amount: totalAmount * 100,
      currency: "INR",
      description: `Cart payment for ${userData.name}`,
      customer: {
        name: userData.name,
        email: userData.email,
        contact: String(deliveryAddress.mobile),
      },
      notes: {
        pendingOrderId: pendingOrder._id.toString(),
      },
      notify: { sms: true, email: true },
      reminder_enable: true,
      callback_url: "http://localhost:5174/payment-success",
      callback_method: "get",
    });

    res.status(200).json({ success: true, link: paymentLink.short_url });
  } catch (err) {
    console.error("🔥 Razorpay Error:", err);
    res.status(400).send("Failed to generate payment link...");
  }
};


// exports.verifyPayment = async (req, res) => {

//   const secret = process.env.RAZORPAY_WEBHOOK_KEY_SECRET;
//   const receivedSignature = req.headers["x-razorpay-signature"];
//   const rawBody = req.body;

//   if (!Buffer.isBuffer(rawBody)) {
//     return res.status(400).send("Invalid raw body");
//   }

//   const expectedSignature = crypto
//     .createHmac("sha256", secret)
//     .update(rawBody)
//     .digest("hex");

//   if (expectedSignature !== receivedSignature) {
//     console.warn("⚠️ Webhook signature verification failed");
//     return res.status(400).send("Invalid signature");
//   }

//   const payload = JSON.parse(rawBody.toString("utf8"));


//   const event = payload.event;

//   if (
//     event === "payment_link.paid" &&
//     payload.payload?.payment_link?.entity?.status === "paid"
//   ) {
//     const paymentLink = payload.payload.payment_link.entity;

  
//     const notes = paymentLink.notes;

//     const userId = notes.userId;
//     const productID = notes.productID;
//     const variant = notes.variant;
//     const quantity = notes.quantity;
//     const price = notes.price;
//     const orderId = paymentLink.order_id;
//     const status = paymentLink.status;
//     const delivery = JSON.parse(notes.deliveryAddress);
//     const referenceID = paymentLink. reference_id || "";

//     const paymentID = paymentLink.id;

//     // Optional: Construct additional order info
//     const orderDetails = {
//       orderId,
//       referenceID,
//       delivery,
//       status,
//       price,
//       quantity,
//       variant,
//       productID,
//       paymentID






//     };

  

//     // Save to user’s order history
//     let userData = await UserSchema.findByIdAndUpdate(userId, {
//       $push: {
//         orders: {
//           orderDetails
//         },
//       },
//     });



//     let product = await ProductSchema.findById(productID);

//     await OrderSchema.create({
//         user:userData,
//         items:{
//             product,
//             variant,
//             quantity:Number(quantity),
//             price:Number(price)
//         },
//     orderId:orderId,
//     shippingAddress:delivery,
//     paymentMethod:"",
//     paymentStatus:status,
//     referenceID,
//     orderStatus:"Booked",
//     totalAmount:Number(price),




//     })

//     return res.status(200).json({ success: true });
//   }

//   res.status(200).json({ success: false, message: "Webhook ignored" });
// };



exports.verifyPayment = async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_KEY_SECRET;
  const receivedSignature = req.headers["x-razorpay-signature"];
  const rawBody = req.body;

  if (!Buffer.isBuffer(rawBody)) {
    return res.status(400).send("Invalid raw body");
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== receivedSignature) {
    return res.status(400).send("Invalid signature");
  }

  const payload = JSON.parse(rawBody.toString("utf8"));
  const event = payload.event;

  if (
    event === "payment_link.paid" &&
    payload.payload?.payment_link?.entity?.status === "paid"
  ) {
    const paymentLink = payload.payload.payment_link.entity;
    const pendingOrderId = paymentLink.notes.pendingOrderId;

    const pendingOrder = await PendingOrderSchema.findById(pendingOrderId).populate("user");


    console.log(pendingOrder);

    if (!pendingOrder) return res.status(404).send("Pending order not found");

    const savedOrders = [];

    const items = await Promise.all(
      pendingOrder.order.map(async item => {
        const product = await ProductSchema.findById(item.productid);
        return {
          product,
          variant: item.variant,
          quantity: item.quantity,
          price: item.price,
        };
      })
    );

      const totalAmount = items.reduce((sum, item) => sum + item.price, 0);


    
      

      const newOrder = await OrderSchema.create({
        user: pendingOrder.user,
        items,
        orderId: paymentLink.order_id,
        shippingAddress: pendingOrder.deliveryAddress,
        paymentMethod: "Razorpay",
        paymentStatus: "paid",
        referenceID: paymentLink.reference_id || "",
        orderStatus: "Booked",
        totalAmount,
        paymentID: paymentLink.id,
      });

      savedOrders.push(newOrder);


    

    const orderDetails = {
      orderId:paymentLink.order_id,
      referenceID:"Razorpay",
      delivery:pendingOrder.deliveryAddress,
      status:paymentLink.status,
      price:pendingOrder.totalAmount,
      product : pendingOrder.order.map((i) => ({
  quantity: i.quantity,
  variant: i.variant,
  productID: i.productid,
})),
      paymentID:paymentLink.id


    }

   await UserSchema.findByIdAndUpdate(pendingOrder.user._id, {
  $push: {
    orders: {
      orderDetails,
      createdAt: new Date(),
    },
  },
});
 

    return res.status(200).json({ success: true, orders: savedOrders });
  }

  res.status(200).json({ success: false, message: "Webhook ignored" });
};

