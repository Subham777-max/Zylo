import { getCartWithTotal } from "../dao/cart.dao.js";
import { getVariantStock } from "../dao/product.dao.js";
import chartModel from "../models/chart.model.js";

export async function addToChart(req, res) {
    try {
        const { productId, variantId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;

        let chart = await chartModel.findOne({ user: userId });
        if (!chart) {
            chart = new chartModel({ user: userId, items: [] });
        }

        const existingItemIndex = chart.items.findIndex(item => item.product.equals(productId) && item.variant.equals(variantId));
        if (existingItemIndex > -1) {
            const stock = await getVariantStock(productId, variantId);
            if (stock < (quantity + chart.items[existingItemIndex].quantity)) {
                return res.status(400).json({ message: "Insufficient stock", success: false });
            }

            chart.items[existingItemIndex].quantity += quantity;
        } else {
            const stock = await getVariantStock(productId, variantId);

            if (stock < quantity) {
                return res.status(400).json({ message: "Insufficient stock", success: false });
            }
            chart.items.push({ product: productId, variant: variantId, quantity });
        }

        await chart.save();
        chart = await getCartWithTotal(userId);

        res.status(200).json({ 
            message: "Product added to cart", 
            success: true, 
            cart: chart
        });

    }catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export async function getChart(req, res) {
    try {
        const userId = req.user.id;
        const chart = await getCartWithTotal(userId);
        res.status(200).json({ 
            message: "Cart fetched successfully", 
            success: true, 
            cart: chart
        });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export async function removeFromChart(req, res) {
    try {
        const { productId, variantId } = req.params;
        const userId = req.user.id;
        let chart = await chartModel.findOne({ user: userId });
        if (!chart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        chart.items = chart.items.filter(item => !(item.product.equals(productId) && item.variant.equals(variantId)));
        await chart.save();
        chart = await getCartWithTotal(userId);
        res.status(200).json({ message: "Product removed from cart", success: true, cart: chart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export async function updateQuantity(req, res) {
    try {
        const { productId, variantId } = req.params;
        const { quantity } = req.body;
        const userId = req.user.id;
        let chart = await chartModel.findOne({ user: userId });
        if (!chart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        const item = chart.items.find(i => i.product.equals(productId) && i.variant.equals(variantId));
        if (!item) {
            return res.status(404).json({ message: "Product not found in cart", success: false });
        }

        const stock = await getVariantStock(productId, variantId);

        if (stock < quantity) {
            return res.status(400).json({
                message: "Insufficient stock",
                success: false
            });
        }

        item.quantity = quantity;

        item.quantity = quantity;
        await chart.save();
        chart = await getCartWithTotal(userId);
        res.status(200).json({ message: "Product quantity updated", success: true, cart: chart });
    } catch (error) {
        console.error("Error updating product quantity:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}