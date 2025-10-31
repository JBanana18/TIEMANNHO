import userModel from "../models/userModel.js";

//  them mon vao gio hang
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Da them" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Loi" });
  }
};

// xoa mon khoi gio hang
const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Da xoa" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Loi" });
  }
};

// lấy dữ liệu giỏ hàng của người dùng
const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);

    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Loi" });
  }
};

export { addToCart, removeFromCart, getCart };
