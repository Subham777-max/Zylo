import productModel from "../models/product.model.js";

export async function getVariantStock(productId, variantId){
    try{
        const product = await productModel.findById(productId);
        if(!product){
            throw new Error("Product not found");
        }

        const variant = product.variants.find(v => v._id.equals(variantId));
        if(!variant){
            throw new Error("Variant not found");
        }

        return variant.stock;

    }catch (error) {
        console.error("Error checking variant stock:", error);
        throw new Error("Internal server error");
    }
}