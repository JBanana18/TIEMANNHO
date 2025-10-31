import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Khám phá thực đơn của chúng tôi.</h1>
      <p className="explore-menu-text">
        Thực đơn của “Tiệm Ăn Nhỏ” mang hương vị thân quen, từ những món ăn
        truyền thống đến những gợi ý mới lạ – tất cả đều được chế biến tỉ mỉ,
        giữ trọn sự ấm áp trong từng món. Chúng tôi tin rằng một bữa ăn ngon
        không chỉ là hương vị, mà còn là cảm giác thân thuộc và sẻ chia – điều
        mà “Tiệm Ăn Nhỏ” luôn muốn gửi gắm đến mỗi vị khách khi ghé thăm.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item,index)=>{
            return (
                <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
