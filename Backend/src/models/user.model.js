import e from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    contact:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    fullName:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["buyer", "seller"],
        default: "buyer",
    }
})

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }
    try{
        this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
        throw new Error("Error hashing password");
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        throw new Error("Error comparing passwords");
    }
};


const userModel = mongoose.model("User", userSchema);

export default userModel;