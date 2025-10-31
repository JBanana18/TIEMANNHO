import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const formatCurrency = (amount) =>
    amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setData(response.data.data || []);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "đang xử lý":
      case "processing":
        return <span className="status-icon">🚚</span>;
      case "hoàn tất":
      case "completed":
        return <span className="status-icon">✅</span>;
      case "đã hủy":
      case "cancelled":
        return <span className="status-icon">❌</span>;
      default:
        return <span className="status-icon">⌛</span>;
    }
  };

  useEffect(() => {
    if (token) fetchOrders();
  }, [token]);

  return (
    <div className="my-orders">
      <h2>Đơn Hàng Của Tôi</h2>

      <div className="container">
        {data.length === 0 ? (
          <p className="empty">Bạn chưa có đơn hàng nào.</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="parcel" />

              <div className="order-info">
                <p className="order-items">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} × {item.quantity}
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>

                <p className="order-amount">{formatCurrency(order.amount)}</p>
                <p className="order-total">Tổng số món: {order.items.length}</p>
                <p className={`order-status ${order.status.toLowerCase()}`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </p>
              </div>

              <button className="track-btn">Theo dõi</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
