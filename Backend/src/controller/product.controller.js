import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
    try{
        const { title, description, priceAmount,priceCurrency } = req.body;
        const seller = req.user.id;

        const images = await Promise.all(req.files.map(async (file) =>{
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
                folder: "zylo/products"
            })
        }))

        const product = await productModel.create({
            title,
            description,
            price: {
                amount: priceAmount,
                currency: priceCurrency || "INR"
            },
            seller,
            images: images.map((img,idx) => ({
                url: img.url,
                alt: title + "image" + (idx + 1)
            }))
        })

        res.status(201).json({
            message: "Product created successfully",
            success: true,
            product
        });
    }catch(error){
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export async function getMyProducts(req, res) {
    try{
        const seller = req.user.id;
        const products = await productModel.find({ seller }).sort({ createdAt: -1 });
        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export async function getProductById(req, res) {
    try{
        const productId = req.params.id;
        const product = await productModel.findById(productId).populate("seller", "fullName email");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product fetched successfully",
            success: true,
            product
        });
    }catch(error){
        console.error("Error fetching product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export async function deleteProductById(req, res) {
    try{
        const productId = req.params.id;
        const userId = req.user.id;
        const product = await productModel.findOneAndDelete({ _id: productId, seller: userId });

        if (!product) {
            return res.status(404).json({ message: "Product not found or unauthorized" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            success: true
        });
    }catch(error){
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}

export async function getAllProducts(req, res) {
    try{
        const products = await productModel.find().populate("seller", "fullName email").sort({ createdAt: -1 });
        res.status(200).json({
            message: "Products fetched successfully",
            success: true,
            products
        });
    }catch(error){
        console.error("Error fetching products:", error);
        return res.status(500).json({ message: "Server error" });
    }
}