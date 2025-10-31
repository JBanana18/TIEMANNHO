import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Thiếu token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // ✅ Đảm bảo req.body tồn tại
    if (!req.body) req.body = {};
    
    req.body.userId = decoded.id;

    console.log("✅ Token hợp lệ, userId:", decoded.id);
    next();
  } catch (error) {
    console.log("❌ Lỗi xác thực token:", error.message);
    res.json({ success: false, message: "Token không hợp lệ" });
  }
};

export default authMiddleware;
