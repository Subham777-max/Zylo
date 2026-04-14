import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided, authorization denied" });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token, authorization denied" });
    }
}

export async function sellerMiddleware(req, res, next) {
    if (req.user.role !== "seller") {
        return res.status(403).json({ message: "Access denied, seller only" });
    }
    next();
}