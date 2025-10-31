import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const foodRouter = express.Router();

// Lấy __dirname trong môi trường ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình nơi lưu ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Thư mục lưu ảnh nằm ở backend/uploads
    const uploadPath = path.join(__dirname, "../uploads");

    // Nếu chưa có thư mục thì tạo
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    // Tên file có timestamp để tránh trùng
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// API routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;
