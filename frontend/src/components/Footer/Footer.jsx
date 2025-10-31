import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            {" "}
            Tận hưởng bữa ăn ngon và cảm giác thân quen tại Quán Ăn Nhỏ – nơi
            hương vị và sự ấm áp luôn song hành. Chúng tôi mang đến cho bạn những bữa ăn ấm áp như ở nhà.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>CÔNG TY CỔ PHẦN</h2>
            <ul>
                <li>Trang Chủ</li>
                <li>Về Chúng Tôi</li>
                <li>Phân Phối</li>
                <li>Chính Sách Bảo Mật</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Liên Hệ Với Chúng Tôi</h2>
            <ul>
                <li>+098-113-114-115</li>
                <li>thanhson@gmail.com</li>
                <li>thanhson@twitter.com</li>
                <li>thanhson@facebook.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 @ Tiem An Nho - All Right Reserved.</p>
    </div>
  );
};

export default Footer;
