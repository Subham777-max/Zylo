import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { addToChart, getChart, removeFromChart, updateQuantity } from "../controller/chart.controller.js";
const router = Router();

/**
 * @route POST /api/charts
 * @desc Add a product to the chart
 * @access Private
 */
router.post("/", authMiddleware, addToChart);

/**
 * @route GET /api/charts
 * @desc Get the user's chart
 * @access Private
 */
router.get("/", authMiddleware, getChart);

/**
 * @route DELETE /api/charts
 * @desc Remove a product from the chart
 * @access Private
 */
router.delete("/", authMiddleware, removeFromChart);

/**
 * @route PATCH /api/charts
 * @desc Update the quantity of a product in the chart
 * @access Private
 */
router.patch("/", authMiddleware, updateQuantity);

export default router;