import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Lỗi xác thực thanh toán:", err);
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="verify-box">
        <div className="spinner"></div>
        <p>Đang xác thực thanh toán của bạn...</p>
      </div>
    </div>
  );
};

export default Verify;
