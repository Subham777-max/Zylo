import { Router } from "express";
import { register,login, getMe, googleAuthCallback } from "../controller/auth.controller.js";
import { registerValidation,loginValidation } from "../validator/auth.validator.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import passport from "passport";
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


/**
 * @route GET /api/auth/google
 * @desc Authenticate with Google
 * @access Public
 */
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @route GET /api/auth/google/callback
 * @desc Handle Google authentication callback
 * @access Public
 */
router.get("/google/callback", passport.authenticate("google",{session:false,failureRedirect: "http://localhost:5173/login"}),googleAuthCallback);

export default router;