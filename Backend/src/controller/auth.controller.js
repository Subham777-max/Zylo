import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

function sendTokenResponse(user,res,message){

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, config.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    res.status(201).json({ 
        message,
        success: true,
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            contact: user.contact,
            role: user.role,
        }, 
    });
}


export async function register(req, res) {
    const { email, password, fullName, contact, isSeller } = req.body;

    try{

        const existingUser = await userModel.findOne({ 
            $or:[
                {email},
                {contact}
            ]
        });

        if(existingUser){
            return res.status(400).json({ message: "Email or contact number already in use" });
        }

        const newUser = await userModel.create({
            email,
            password,
            fullName,
            contact,
            role: isSeller ? "seller" : "buyer",
        });

        sendTokenResponse(newUser, res, "User registered successfully");

    }catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}
