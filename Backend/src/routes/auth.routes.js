import { Router } from "express";
import { register } from "../controller/auth.controller.js";
import { registerValidation } from "../validator/auth.validator.js";
const router = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post("/register", registerValidation, register);

export default router;