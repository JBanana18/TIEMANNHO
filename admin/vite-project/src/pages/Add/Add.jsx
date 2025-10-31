import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHander = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHander}>
        <div className="add-img-upload flex-col">
          <p>Tải ảnh món</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Tên Món</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Nhập ở đây"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Mô tả món ăn</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Viết mô tả món ăn"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Loại món ăn</p>
            <select onChange={onChangeHandler} name="category" id="">
              <option value="Salad">Salad</option>
              <option value="Cuốn">Cuốn</option>
              <option value="Tráng miệng">Tráng miệng</option>
              <option value="Bánh mì kẹp">Bánh mì kẹp</option>
              <option value="Bánh ngọt">Bánh ngọt</option>
              <option value="Món chay">Món chay</option>
              <option value="Mì Ý">Mì Ý</option>
              <option value="Mì">Mì</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Giá món</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="20.00vnd"
            />
          </div>
        </div>
        <button onChange={onSubmitHander} type="submit" className="add-btn">
          Thêm món
        </button>
      </form>
    </div>
  );
};

export default Add;
