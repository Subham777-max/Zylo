import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addToChart, getChart, removeFromChart, updateQuantity } from "../controller/chart.controller.js";
const router = Router();

/**
 * @route POST /api/carts
 * @desc Add a product to the cart
 * @access Private
 */
router.post("/", authMiddleware, addToChart);

/**
 * @route GET /api/carts
 * @desc Get the user's cart
 * @access Private
 */
router.get("/", authMiddleware, getChart);

/**
 * @route DELETE /api/carts/:productId
 * @desc Remove a product from the cart
 * @access Private
 */
router.delete("/:productId", authMiddleware, removeFromChart);

/**
 * @route PATCH /api/carts
 * @desc Update the quantity of a product in the cart
 * @access Private
 */
router.patch("/", authMiddleware, updateQuantity);

export default router;