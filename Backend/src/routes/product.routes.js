import { Router } from 'express';
import { authMiddleware, sellerMiddleware } from '../middleware/auth.middleware.js';
import { createProduct } from '../controller/product.controller.js';

const router = Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private(seller only)
 */
router.post("/", authMiddleware, sellerMiddleware,createProduct);

export default router;