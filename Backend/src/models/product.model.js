import mongoose from 'mongoose';
const variantSchema = new mongoose.Schema({
    attributes: {
        type: Map,
        of: String, 
         // example: { size: "M", color: "Red" }
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            enum: ["USD", "EUR", "GBP", "INR", "JPY"],
            default: "INR"
        }
    },
    stock: {
        type: Number,
        default: 0
    },
    images: [
        {
            url: String,
            alt: String
        }
    ]
})
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    price:{
        amount:{
            type:Number,
            required:true
        },
        currency:{
            type:String,
            enum:["USD", "EUR", "GBP", "INR", "JPY"],
            default:"INR",
        }
    },
    images:[
        {
            url:{
                type:String,
                required:true
            },
            alt:{
                type:String,
                required:true
            }
        }
    ],
    variants:[
        variantSchema
    ]
},{timestamps:true});

const productModel = mongoose.model("Product", productSchema);

export default productModel;