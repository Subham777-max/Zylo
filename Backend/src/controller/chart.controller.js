import chartModel from "../models/chart.model.js";

export async function addToChart(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        let chart = await chartModel.findOne({ user: userId });
        if (!chart) {
            chart = new chartModel({ user: userId, products: [] });
        }

        const existingProduct = chart.products.find(p => p.product.equals(productId));
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            chart.products.push({ product: productId, quantity });
        }

        await chart.save();
        chart = await chart.populate("products.product");
        res.status(200).json({ message: "Product added to cart", success: true, cart: chart });

    }catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export async function getChart(req, res) {
    try {
        const userId = req.user.id;
        const chart = await chartModel.findOne({ user: userId }).populate("products.product");
        res.status(200).json({ message: "Cart fetched successfully", success: true, cart: chart });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export async function removeFromChart(req, res) {
    try {
        const { productId } = req.params;
        const userId = req.user.id;
        let chart = await chartModel.findOne({ user: userId });
        if (!chart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        chart.products = chart.products.filter(p => !p.product.equals(productId));
        await chart.save();
        chart = await chart.populate("products.product");
        res.status(200).json({ message: "Product removed from cart", success: true, cart: chart });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export async function updateQuantity(req, res) {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        let chart = await chartModel.findOne({ user: userId });
        if (!chart) {
            return res.status(404).json({ message: "Cart not found", success: false });
        }

        const product = chart.products.find(p => p.product.equals(productId));
        if (!product) {
            return res.status(404).json({ message: "Product not found in cart", success: false });
        }

        product.quantity = quantity;
        await chart.save();
        chart = await chart.populate("products.product");
        res.status(200).json({ message: "Product quantity updated", success: true, cart: chart });
    } catch (error) {
        console.error("Error updating product quantity:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}