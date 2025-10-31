import React, { useContext, useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

  const navigate = useNavigate();

  // 🔹 Click ngoài thì tự đóng dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setOpenDropdown(false);
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Trang Chủ
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          Ứng Dụng
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Liên Hệ
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-sreach-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>Đăng Nhập</button>
        ) : (
          <div className="navbar-profile-wrapper" ref={dropdownRef}>
            <div
              className="navbar-profile"
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <img src={assets.profile_icon} alt="profile" />
            </div>

            {openDropdown && (
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="bag" />
                  <p>Đơn Hàng</p>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <img src={assets.logout_icon} alt="logout" />
                  <p>Đăng Xuất</p>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
