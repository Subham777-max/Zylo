import { Router } from 'express';
import { authMiddleware, sellerMiddleware } from '../middleware/auth.middleware.js';
import { createProduct,deleteProductById,getMyProducts,getProductById } from '../controller/product.controller.js';
import multer from 'multer';
import { createProductValidator } from '../validator/product.validator.js';

const router = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
})

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private(seller only)
 */
router.post("/", authMiddleware, sellerMiddleware,upload.array("images",7),createProductValidator,createProduct);

/**
 * @route GET /api/products/my
 * @desc Get products of the logged in seller
 * @access Private(seller only)
 */
router.get("/my", authMiddleware, sellerMiddleware, getMyProducts);

/**
 * @route GET /api/products/:id
 * @desc Get product details by ID
 * @access Public
 */
router.get("/:id", getProductById);

/**
 * @route DELETE /api/products/:id
 * @desc Delete a product by ID
 * @access Private(seller only)
 */
router.delete("/:id", authMiddleware, sellerMiddleware,deleteProductById);

export default router;