import mongoose from "mongoose";

const chartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true,
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true,
            },
            variant:{
                type: mongoose.Schema.Types.ObjectId,
                required: true,
            },
            quantity:{
                type:Number,
                required:true,
            }
        }
    ]
})

const chartModel = mongoose.model("Chart", chartSchema);

export default chartModel;