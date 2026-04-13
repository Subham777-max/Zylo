import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";

function sendTokenResponse(user,res,message,statusCode = 200){

    const token = jwt.sign({
        id: user._id,
        email: user.email,
        role: user.role,
    }, config.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token);

    res.status(statusCode).json({ 
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

        sendTokenResponse(newUser, res, "User registered successfully", 201);

    }catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
}


export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        sendTokenResponse(user, res, "Login successful", 200);
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error during login" });
    }
}

export async function getMe(req, res) {
    try {
        console.log("Fetching user with ID:", req.user);
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User fetched successfully", success: true, user });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Server error while fetching user" });
    }
}