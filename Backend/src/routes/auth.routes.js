import { Router } from "express";
import { register,login, getMe } from "../controller/auth.controller.js";
import { registerValidation,loginValidation } from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerValidation, register);

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 * @access Public
 */
router.post("/login", loginValidation, login);

/**
 * @route POST /api/auth/me
 * @desc Get current logged in user
 * @access Private
 */
router.get("/me", authMiddleware, getMe);
export default router;