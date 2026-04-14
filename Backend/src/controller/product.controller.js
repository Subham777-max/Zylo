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