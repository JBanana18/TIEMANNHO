import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // 🧾 Lấy tất cả đơn hàng
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Lỗi khi tải danh sách đơn hàng");
      }
    } catch (err) {
      console.error(err);
      toast.error("Không thể kết nối đến server");
    }
  };

  // 🔄 Cập nhật trạng thái đơn hàng
  const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.post(url + "/api/order/status", {  // 👈 đổi đúng endpoint
      orderId,
      status: newStatus,
    });
    if (response.data.success) {
      toast.success("Cập nhật trạng thái thành công!");
      fetchAllOrders(); // load lại danh sách
    } else {
      toast.error("Không thể cập nhật trạng thái");
    }
  } catch (error) {
    console.error(error);
    toast.error("Lỗi khi cập nhật trạng thái");
  }
};


  

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // 🔁 Hàm đổi trạng thái sang tiếng Việt
  const translateStatus = (status) => {
    switch (status) {
      case "Food Processing":
        return "Đang xử lý";
      case "Out for delivery":
        return "Đang giao hàng";
      case "Delivered":
        return "Đã giao";
      default:
        return "Không xác định";
    }
  };

  // 🔰 Icon hiển thị theo trạng thái
  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return "✅";
      case "Out for delivery":
        return "🚚";
      case "Food Processing":
        return "🍳";
      default:
        return "❌";
    }
  };

  return (
    <div className="order add">
      <h3>Đơn hàng</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel" />

            <div className="order-info">
              {/* 🧾 Danh sách món ăn */}
              <p className="order-item-food">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} × {item.quantity}
                    {i < order.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>

              {/* 👤 Thông tin khách hàng */}
              <p>
                <b>Tên khách:</b> {order.address?.firstName}{" "}
                {order.address?.lastName}
              </p>
              <p>
                <b>Email:</b> {order.address?.email}
              </p>
              <p>
                <b>Điện thoại:</b> {order.address?.phone}
              </p>

              {/* 🚚 Địa chỉ giao hàng */}
              <p>
                <b>Địa chỉ giao hàng:</b>{" "}
                {order.address?.street}, {order.address?.city},{" "}
                {order.address?.state}
              </p>

              {/* 💵 Tổng tiền */}
              <p>
                <b>Tổng tiền:</b>{" "}
                {order.amount.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>

              {/* 🚦 Trạng thái + icon */}
              <p>
                <b>Trạng thái hiện tại:</b>{" "}
                <span
                  className={`order-status ${
                    order.status === "Delivered"
                      ? "delivered"
                      : order.status === "Out for delivery"
                      ? "delivery"
                      : "processing"
                  }`}
                >
                  {getStatusIcon(order.status)} {translateStatus(order.status)}
                </span>
              </p>

              {/* 🔽 Chọn trạng thái */}
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              >
                <option value="Food Processing">Đang xử lý</option>
                <option value="Out for delivery">Đang giao hàng</option>
                <option value="Delivered">Đã giao</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
