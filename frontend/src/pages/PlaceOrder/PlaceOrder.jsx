import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token,food_list,cartItems,url } = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }


  // ✅ Hàm định dạng tiền VNĐ
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const shippingFee = 20000;
  const subtotal = getTotalCartAmount();
  const total = subtotal + shippingFee;

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Loi");
    }
  }


  return (
    <form onSubmit={placeOrder} className="place-order">
      {/* 🧾 BÊN TRÁI - THÔNG TIN VẬN CHUYỂN */}
      <div className="place-order-left">
        <p className="title">THÔNG TIN VẬN CHUYỂN</p>

        <div className="multi-fields">
          <input name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder="Họ" required />
          <input name="lastName" onChange={onChangeHandler} value={data.lastName} type="text" placeholder="Tên" required />
        </div>

        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Email" required />
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder="Đường" required />

        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder="Thành phố" required />
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder="Số nhà" required />
        </div>

        <input name="phone" onChange={onChangeHandler} value={data.phone} type="tel" placeholder="Số điện thoại" required />
      </div>

      {/* 💰 BÊN PHẢI - TỔNG TIỀN */}
      <div className="place-order-right">
        <div className="cart-total">
          <h2>TỔNG TIỀN</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>{formatCurrency(shippingFee)}</p>
            </div>
            <hr />
            <div className="cart-total-details total-bold">
              <p>Tổng cộng</p>
              <p>{formatCurrency(total)}</p>
            </div>
          </div>
        </div>
        <button className="checkout-btn" type="submit">TIẾN HÀNH THANH TOÁN</button>
      </div>
    </form>
  );
};

export default PlaceOrder;
