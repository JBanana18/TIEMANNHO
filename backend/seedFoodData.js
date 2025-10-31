import mongoose from "mongoose";
import dotenv from "dotenv";
import foodModel from "./models/foodModel.js";
import fs from "fs";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

// 🔹 Đọc dữ liệu từ file JSON (bạn sẽ tạo file này ở bước 2)
const foodDataPath = path.join(__dirname, "food_data.json");
const foodData = JSON.parse(fs.readFileSync(foodDataPath, "utf-8"));

const seedData = async () => {
  try {
    // Kết nối MongoDB
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Kết nối MongoDB thành công");

    // Xóa toàn bộ dữ liệu cũ
    await foodModel.deleteMany({});
    console.log("🧹 Đã xóa dữ liệu cũ trong collection 'food'");

    // Import dữ liệu mới
    await foodModel.insertMany(foodData);
    console.log("🍔 Đã import toàn bộ món ăn vào MongoDB!");

    process.exit();
  } catch (error) {
    console.error("❌ Lỗi khi import:", error);
    process.exit(1);
  }
};

seedData();
