import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    // 1️⃣ Lưu đơn hàng vào MongoDB
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount, // đơn vị VND
      address: req.body.address,
      status: "Pending",
    });

    await newOrder.save();

    // 2️⃣ Xóa giỏ hàng sau khi đặt hàng
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // 3️⃣ Stripe KHÔNG hỗ trợ "VND" => cần quy đổi sang USD (tạm tính 1 USD = 25,000 VND)
    const exchangeRate = 25000;

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        // item.price là VND, chuyển sang USD *100 để ra cent
        unit_amount: Math.round((item.price / exchangeRate) * 100),
      },
      quantity: item.quantity || 1,
    }));

    // 4️⃣ Thêm phí giao hàng (ví dụ 20,000 VND)
    const deliveryFeeVND = 20000;
    const deliveryFeeUSD = Math.round((deliveryFeeVND / exchangeRate) * 100);

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Phí giao hàng",
        },
        unit_amount: deliveryFeeUSD,
      },
      quantity: 1,
    });

    // 5️⃣ Tạo phiên thanh toán trên Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi xử lý đơn hàng",
      error: error.message,
    });
  }
};

const verifyOrder = async (req,res) => {
  const {orderId,success} = req.body;
  try {
    if (success=="true") {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({success:true,message:"Da thanh toan"})
    }
    else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({success:false,message:"Loi thanh toan"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Loi"})
  }
}

// don hang cua ng dung
const userOrders = async (req,res) => {
  try {
    const orders = await orderModel.find({userId:req.body.userId})
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Loi"})
  }
}

// lay danh sach order cho admin
const listOrders =async (req,res) => {
  try {
    const orders = await orderModel.find({});
    res.json({success:true,data:orders})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Loi"})
  }
}

// api cho cap nhat trang thai don hang
const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Da update"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Loi"})
  }
}

export { placeOrder, verifyOrder, userOrders,listOrders, updateStatus };
