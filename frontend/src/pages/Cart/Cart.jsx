import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } =
    useContext(StoreContext);

  // Định dạng tiền tệ Việt Nam
  const formatCurrency = (amount) => {
    return amount.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  const shippingFee = 20000;
  const subtotal = getTotalCartAmount();
  const total = subtotal + shippingFee;

  const navigate = useNavigate();

  return (
    <div className="cart">
      {/* DANH SÁCH MÓN ĂN */}
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Món ăn</p>
          <p>Tên</p>
          <p>Giá</p>
          <p>Số lượng</p>
          <p>Tổng</p>
          <p>Xóa</p>
        </div>
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img src={url+"/images/"+item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{formatCurrency(item.price)}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{formatCurrency(item.price * cartItems[item._id])}</p>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item._id)}
                  >
                    ✕
                  </button>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      {/* PHẦN TỔNG TIỀN */}
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Tổng Tiền</h2>
          <div>
            <div className="cart-total-details">
              <p>Tạm tính</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Phí vận chuyển</p>
              <p>
                {subtotal > 0 ? formatCurrency(shippingFee) : formatCurrency(0)}
              </p>
            </div>
            <hr />
            <div className="cart-total-details total-bold">
              <p>Tổng cộng</p>
              <p>
                {subtotal > 0
                  ? formatCurrency(subtotal + shippingFee)
                  : formatCurrency(0)}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (subtotal > 0) navigate("/order");
            else alert("Giỏ hàng của bạn đang trống!");
          }}
          className="checkout-btn"
        >
          TIẾN HÀNH ĐẶT HÀNG
        </button>
      </div>

      {/* PHẦN MÃ GIẢM GIÁ */}
      <div className="cart-promocode">
        <div>
          <p>Nhập mã giảm giá của bạn tại đây</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="Mã giảm giá" />
            <button>NHẬP</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
