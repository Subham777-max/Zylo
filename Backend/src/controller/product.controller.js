import productModel from "../models/product.model.js";

export async function createProduct(req, res) {
    try{

    }catch(error){
        console.error("Error creating product:", error);
        return res.status(500).json({ message: "Server error" });
    }
}