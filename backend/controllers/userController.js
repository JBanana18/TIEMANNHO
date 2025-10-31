import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//dang nhap user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success:false,message:"Nguoi dung khong ton tai"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (!isMatch) {
            return res.json({success:false,message:"thông tin xác thực không hợp lệ"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Loi"})
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//dang ki user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // kiem tra xem tai khoan da ton tai chua
        const exists = await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"Da ton tai"})
        }
        
        //kiem tra email co hop le ko
        if (!validator.isEmail(email)) {
            return res.json({success:false,message:"Email khong hop le"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Password khong hop le"})
        }

        // ma hoa password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {   
        console.log(error);
        res.json({success:false,message:"Loi"})
    }
}

export {loginUser,registerUser}
