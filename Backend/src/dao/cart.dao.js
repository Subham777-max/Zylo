import mongoose from "mongoose";
import chartModel from "../models/chart.model.js";

export async function getCartWithTotal(userId){
    try{
        const result = await chartModel.aggregate([
            {$match: {user: new mongoose.Types.ObjectId(userId)}},
            {
                $unwind: {
                    path: '$items'
                }
            }, {
                $lookup: {
                    from: 'products', 
                    localField: 'items.product', 
                    foreignField: '_id', 
                    as: 'items.product'
                }
            }, {
                $unwind: {
                    path: '$items.product'
                }
            }, {
                $unwind: {
                    path: '$items.product.variants'
                }
            }, {
                $match: {
                    $expr: {
                        $eq: [
                            '$items.variant', '$items.product.variants._id'
                        ]
                    }
                }
            }, {
                $addFields: {
                    itemPrice: {
                        $multiply: [
                            '$items.product.variants.price.amount', '$items.quantity'
                        ]
                    }
                }
            }, {
                $group: {
                    _id: '$_id', 
                    total: {
                        $sum: '$itemPrice'
                    }, 
                    items: {
                        $push: '$items'
                    }
                }
            }
        ]);
        return result[0] || { total: 0, items: [] };
    }catch (error) {
        console.error("Error calculating cart total:", error);
        throw new Error("Internal server error");
    }
}