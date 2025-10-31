import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // 🧩 Lấy danh sách món ăn từ backend
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Không lấy được dữ liệu món ăn từ server");
      }
    } catch (error) {
      console.error("Lỗi khi tải danh sách:", error);
      toast.error("Không thể tải danh sách món ăn");
    }
  };

  // 🗑️ Xóa món ăn
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
      if (response.data.success) {
        toast.success("Đã xóa món ăn");
        fetchList(); // Tải lại danh sách sau khi xóa
      } else {
        toast.error("Lỗi khi xóa món ăn");
      }
    } catch (error) {
      console.error("Lỗi khi xóa món:", error);
      toast.error("Không thể xóa món ăn");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list add flex-col">
      <p>Tổng các món ăn</p>

      <div className="list-table">
        <div className="list-table-format title">
          <b>Ảnh</b>
          <b>Tên</b>
          <b>Danh mục</b>
          <b>Giá</b>
          <b>Hành động</b>
        </div>

        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img
                src={
                  item.image?.startsWith("http") || item.image?.startsWith("/")
                    ? item.image
                    : `${url}/images/${item.image}`
                }
                alt={item.name}
              />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price.toLocaleString()}₫</p>
              <p
                onClick={() => removeFood(item._id)}
                className="cursor"
                title="Xóa món"
              >
                ❌
              </p>
            </div>
          ))
        ) : (
          <p>Không có món ăn nào.</p>
        )}
      </div>
    </div>
  );
};

export default List;
