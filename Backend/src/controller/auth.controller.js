import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

function sendTokenResponse(user,res){

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, config.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);
}


export async function register(req, res) {
    const { email, password, fullName, contact } = req.body;

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
            contact
        });

        sendTokenResponse(newUser, res);
        res.status(201).json({ 
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                contact: newUser.contact,
                role: newUser.role,
            }, 
        });
    }catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}