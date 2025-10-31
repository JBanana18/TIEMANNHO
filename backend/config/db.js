import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://thanhson:%40Atm434377@tiemannho.mk3ds5m.mongodb.net/?appName=TIEMANNHO').then(()=>console.log("DB da ket noi"));
}