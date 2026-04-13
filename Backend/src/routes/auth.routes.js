import { Router } from "express";
import { register,login } from "../controller/auth.controller.js";
import { registerValidation,loginValidation } from "../validator/auth.validator.js";
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
export default router;